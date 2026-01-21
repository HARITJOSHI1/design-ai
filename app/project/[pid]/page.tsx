"use client";

import { useParams } from "next/navigation";
import { useGetProjectWithId } from "@/hooks/project/use-project";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ProjectHeader from "./_components/project-header";
import CanvasProvider from "@/components/providers/canvas-provider";
import Canvas from "@/components/canvas/canvas";

const Page = () => {
  const params = useParams();
  const { user } = useKindeBrowserClient();
  const id = params.pid as string;

  const { data: project, isPending } = useGetProjectWithId(id);

  const frames = project?.frames || [];
  const themeId = project?.theme || "";

  const hasInitialData = project?.frames.length > 0;

  if (!isPending && !project) return <div>Project not found</div>;

  return (
    <div
      className="relative h-screen w-full
   flex flex-col
  "
    >
      <ProjectHeader projectName={project?.name} />

      <CanvasProvider
        initialFrames={frames}
        initialThemeId={themeId}
        hasInitialData={hasInitialData}
        projectId={project?.id}
      >
        <div className="flex flex-1 overflow-hidden">
          <div className="relative flex-1">
            <Canvas
              projectId={project?.id}
              projectName={project?.name}
              isPending={isPending}
            />
          </div>
        </div>
      </CanvasProvider>
    </div>
  );
};

export default Page;
