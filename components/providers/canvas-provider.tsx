import  {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { THEME_LIST, ThemeType } from "@/lib/theme";
import { FrameType } from "@/lib/types/t.project";

export type LoadingStatus =
  | "idle"
  | "running"
  | "analyzing"
  | "generating"
  | "completed";

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

  const THEME = THEME_LIST.find((t) => t.id === themeId);

  const selectedFrame =
    selectedFrameId && frames.length !== 0
      ? frames.find((f) => f.id === selectedFrameId) || null
      : null;

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
