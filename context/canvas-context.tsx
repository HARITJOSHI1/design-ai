import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { THEME_LIST, ThemeType } from "@/lib/theme";
import { FrameType } from "@/lib/types/t.project";
import { useInngestSubscription } from "@inngest/realtime/hooks";
import { fetchRealtimeSubscriptionToken } from "@/app/actions/get-subscribe-token";

export type LoadingStatus =
  | "idle"
  | "running"
  | "analyzing"
  | "generating"
  | "complete";

type CanvasContext = {
  theme?: ThemeType;
  themes?: ThemeType[];
  frames: FrameType[];
  selectedFrameId: string | null;
  selectedFrame: FrameType | null;
  loadingStatus: LoadingStatus | null;
  setTheme: (id: string) => void;
  setFrames: (frames: FrameType[]) => void;
  setSelectedFrameId: (id: string | null) => void;
  updateFrame: (id: string, frame: Partial<FrameType>) => void;
  addFrame: (frame: FrameType) => void;
  setLoadingStatus: (status: LoadingStatus | null) => void;
};

type ContextProviderProps = {
  children: ReactNode;
  initialFrames: FrameType[];
  initialThemeId?: string;
  projectId: string | null;
  hasInitialData: boolean;
};

const CanvasContext = createContext<CanvasContext | undefined>(undefined);

const CanvasProvider = ({
  children,
  initialFrames,
  initialThemeId,
  projectId,
  hasInitialData,
}: ContextProviderProps) => {
  const [themeId, setThemeId] = useState<string>(
    initialThemeId || THEME_LIST[0].id
  );


  const [frames, setFrames] = useState<FrameType[]>(initialFrames || []);

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus | null>(
    null
  );

  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);

  const [prevProjectId, setPrevProjectId] = useState(projectId);

  if (projectId !== prevProjectId) {
    setPrevProjectId(projectId);
    setFrames(initialFrames);
    setThemeId(initialThemeId || THEME_LIST[0].id);
    setSelectedFrameId(null);
  }

  const THEME = THEME_LIST.find((t) => t.id === themeId);

  const selectedFrame =
    selectedFrameId && frames.length !== 0
      ? frames.find((f) => f.id === selectedFrameId) || null
      : null;


  // Subscribe to inngest channel to listen to realtime events for diffrent loading state based on the lifecycle of the screen to frames via ai

  const { freshData } = useInngestSubscription({
    refreshToken: fetchRealtimeSubscriptionToken,
  });

  useEffect(() => {
    if (!freshData || freshData.length === 0) return;

    freshData.forEach((message) => {
      const { data, topic } = message;
      if (data.projectId !== projectId) return;

      switch (topic) {
        case "generation.start":
          setLoadingStatus("running");
          break;


        case "analysis.start":
          setLoadingStatus("generating");
          break;


        case "analysis.complete":
          if (data.theme) setThemeId(data.theme);
          if (data.screens && data.screens.length > 0) {
            const skeletonFrames: FrameType[] = data.screens.map((s: any) => ({
              id: s.id,
              title: s.name,
              htmlContent: "",
              projectId,
              isLoading: true,
            }));
            setFrames((prev) => [...prev, ...skeletonFrames]);
          }
          break;


        case "frame.created":
          if (data.frame) {
            setFrames((prev) => {
              const newFrames = [...prev];

              // First, try to find a skeleton frame by screenId (the plan ID used during analysis)
              const skeletonIndex = data.screenId
                ? newFrames.findIndex((f) => f.id === data.screenId && f.isLoading)
                : -1;

              if (skeletonIndex !== -1) {
                // Replace skeleton with the real frame
                newFrames[skeletonIndex] = { ...data.frame, isLoading: false };
              } else {
                // Fallback: check if frame already exists by its DB id
                const frameIndex = newFrames.findIndex((f) => f.id === data.frame.id);

                if (frameIndex !== -1) {
                  // Existing frame updated by AI
                  newFrames[frameIndex] = { ...data.frame, isLoading: false };
                } else {
                  // Completely new frame created by AI
                  newFrames.push({ ...data.frame, isLoading: false });
                }
              }
              return newFrames;
            })
          }
          break;


        case "generation.complete":
          setLoadingStatus("complete");
          setTimeout(() => {
            setLoadingStatus("idle");
          }, 1000);
          break;


        default:
          break;
      }
    })
  }, [projectId, freshData])


  useEffect(() => {
    if (hasInitialData) setLoadingStatus("idle");
  }, [hasInitialData]);

  useEffect(() => {
    if (initialThemeId) setThemeId(initialThemeId);
  }, [initialThemeId]);

  const addFrame = useCallback((frame: FrameType) => {
    setFrames((prev) => [...prev, frame]);
  }, []);

  const updateFrame = useCallback((id: string, data: Partial<FrameType>) => {
    setFrames((prev) =>
      prev.map((frame) => (frame.id === id ? { ...frame, ...data } : frame))
    );
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        theme: THEME,
        setTheme: setThemeId,
        themes: THEME_LIST,
        frames,
        setFrames,
        selectedFrameId,
        selectedFrame,
        setSelectedFrameId,
        updateFrame,
        addFrame,
        loadingStatus,
        setLoadingStatus,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("useCanvas() must be used inside CanvasProvider");
  return ctx;
};

export default CanvasProvider;
