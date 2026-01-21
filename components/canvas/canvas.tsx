import React, { useState } from "react";
import { useCanvas } from "../providers/canvas-provider";
import CanvasLoader from "./canvas-loader";
import { cn } from "@/lib/utils";
import CanvasFloatingToolbar from "./canvas-floating-toolbar";
import { TOOL_MODE_ENUM, ToolMode } from "@/lib/constants/tool-mode";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CanvasControls from "./canvas-controls";
import DeviceFrame from "../frame/device-frame";
import { DEMO_HTML } from "@/lib/constants/demo-html";

type Props = { projectId: string; projectName: string; isPending: boolean };

const Canvas = ({ projectId, projectName, isPending }: Props) => {
  const { theme, frames, loadingStatus } =
    useCanvas();

  const [toolMode, setToolMode] = useState<ToolMode>(TOOL_MODE_ENUM.SELECT);

  const [zoomPercent, setZoomPercent] = useState(53);
  const [currentScale, setCurrentScale] = useState(0.53);

  const currentStatus = isPending
    ? "fetching"
    : loadingStatus !== "idle" && loadingStatus !== "completed"
      ? loadingStatus
      : null;

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <CanvasFloatingToolbar />

        {currentStatus && <CanvasLoader status={currentStatus} />}
        <TransformWrapper
          initialScale={0.53}
          initialPositionX={40}
          initialPositionY={5}
          minScale={0.1}
          maxScale={3}
          wheel={{ step: 0.1 }}
          pinch={{ step: 0.1 }}
          doubleClick={{ disabled: true }}
          centerZoomedOut={false}
          centerOnInit={false}
          smooth={true}
          limitToBounds={false}
          panning={{
            disabled: toolMode !== TOOL_MODE_ENUM.HAND,
          }}
          onTransformed={(ref) => {
            setZoomPercent(Math.round(ref.state.scale * 100));
            setCurrentScale(ref.state.scale);
          }}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              <div
                className={cn(
                  `absolute inset-0 w-full h-full bg-[#eee]
                  dark:bg-[#242423] p-3
              `,
                  toolMode === TOOL_MODE_ENUM.HAND
                    ? "cursor-grab active:cursor-grabbing"
                    : "cursor-default"
                )}
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                    overflow: "unset",
                  }}
                  contentStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div className="bg-blue-500 size-5">box </div>
                  <DeviceFrame
                    frameId="demo"
                    title="demo screen"
                    html={DEMO_HTML}
                    scale={currentScale}
                    initialPosition={{ x: 1000, y: 100 }}
                    toolMode={toolMode}
                    theme_style={theme?.style}
                  />
                </TransformComponent>
              </div>

              <CanvasControls
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                zoomPercent={zoomPercent}
                toolMode={toolMode}
                setToolMode={setToolMode}
              />
            </>
          )}
        </TransformWrapper>

        {/* <div
          className={cn(
            `absolute inset-0 w-full h-full bg-[#eee] dark:bg-[#242423] p-3`
          )}
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--primary)) 1px, transparent 1px",
            backgroundSize: "20px 20px",
          }}
        ></div> */}
      </div>
    </>
  );
};

export default Canvas;
