"use client";

import { TOOL_MODE_ENUM, ToolMode } from '@/lib/constants/tool-mode';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCanvas } from '../../context/canvas-context';
import { getHTMLWrapper } from '@/lib/functions/getHTMLWrapper';
import { Rnd } from "react-rnd";
import { cn } from '@/lib/utils';
import DeviceFrameToolbar from './device-fram-toolbar';
import axios from 'axios';
import { toast } from 'sonner';

type Props = {
    html: string;
    title?: string;
    width?: number;
    minHeight?: number | string;
    initialPosition?: { x: number; y: number };
    frameId: string;
    scale?: number;
    toolMode: ToolMode;
    theme_style?: string;
    onOpenHtmlDialog: () => void;
    projectId: string;
}

const DeviceFrame = ({ html,
    title = "Untitled",
    width = 420,
    minHeight = 800,
    initialPosition = { x: 0, y: 0 },
    frameId,
    scale = 1,
    toolMode,
    theme_style,
    onOpenHtmlDialog,
    projectId,
}: Props) => {

    const { selectedFrameId, setSelectedFrameId } = useCanvas();
    const [isDownloading, setIsDownloading] = useState(false);

    const [frameSize, setFrameSize] = useState({
        width,
        height: minHeight
    });


    // set iframe size dynamically based on ai content (each frames) by receiving message based on defined height of the parent (i.e. 800px)

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === "FRAME_HEIGHT" && event.data.frameId === frameId) {
                setFrameSize((prev) => ({ ...prev, height: event.data.height }))
            }
        }

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [frameId]);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const isSelected = selectedFrameId === frameId;

    const fullHtml = getHTMLWrapper(html, title, theme_style, frameId);


    const handleDownloadPng = useCallback(async () => {
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            const response = await axios.post("/api/screenshot", {
                html: fullHtml,
                width: frameSize.width,
                height: frameSize.height,
                projectId,
            }, {
                responseType: "blob",
                validateStatus: (s) => (s >= 200 && s < 300) || s === 304
            });

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.png`;
            link.click();
            window.URL.revokeObjectURL(url);
            toast.success("Screenshot downloaded successfully");

            setIsDownloading(false);
        }
        catch (err) {
            console.log(err);
            toast.error("Failed to download screenshot");
            setIsDownloading(false);
        }
    }, [frameId, fullHtml, frameSize.width, frameSize.height, isDownloading, title])

    return (
        <Rnd
            default={{ x: initialPosition.x, y: initialPosition.y, width, height: frameSize.height }}
            minWidth={width}
            minHeight={minHeight}
            size={{ width: frameSize.width, height: frameSize.height }}

            disableDragging={toolMode === TOOL_MODE_ENUM.HAND}
            enableResizing={isSelected && toolMode !== TOOL_MODE_ENUM.HAND}
            scale={scale}
            onClick={(e: any) => {
                // e.stopPropogation();
                if (toolMode === TOOL_MODE_ENUM.SELECT) setSelectedFrameId(frameId);
            }}

            resizeHandleComponent={{
                topLeft: isSelected ? <Handle /> : undefined,
                topRight: isSelected ? <Handle /> : undefined,
                bottomLeft: isSelected ? <Handle /> : undefined,
                bottomRight: isSelected ? <Handle /> : undefined,
            }}

            resizeHandleStyles={{
                top: { cursor: "ns-resize" },
                bottom: { cursor: "ns-resize" },
                left: { cursor: "ew-resize" },
                right: { cursor: "ew-resize" },
            }}

            onResize={(e, direction, ref) => {
                setFrameSize({ width: parseInt(ref.style.width), height: parseInt(ref.style.height) });
            }}

            className={cn(
                "relative z-10",
                isSelected &&
                toolMode !== TOOL_MODE_ENUM.HAND &&
                "ring-3 ring-blue-400 ring-offset-1",
                toolMode === TOOL_MODE_ENUM.HAND
                    ? "cursor-grab! active:cursor-grabbing!"
                    : "cursor-move"
            )}
        >
            <div className="w-full h-full">

                <DeviceFrameToolbar
                    title={title}
                    isSelected={isSelected && toolMode !== TOOL_MODE_ENUM.HAND}
                    disabled={isDownloading}
                    isDownloading={isDownloading}
                    onDownloadPng={handleDownloadPng}
                    onOpenHTMLDialog={onOpenHtmlDialog}
                />

                <div
                    className={cn(
                        `relative w-full h-auto
            rounded-[36px] overflow-hidden bg-black
            shadow-2xl
              `,
                        isSelected && toolMode !== TOOL_MODE_ENUM.HAND && "rounded-none"
                    )}
                    onClick={(e: any) => {
                        e.stopPropagation();
                        if (toolMode === TOOL_MODE_ENUM.SELECT) setSelectedFrameId(frameId);
                    }}
                >
                    <iframe
                        ref={iframeRef}
                        srcDoc={fullHtml}
                        title={title}
                        sandbox="allow-scripts allow-same-origin"
                        style={{
                            width: "100%",
                            minHeight: `${minHeight}px`,
                            height: `${frameSize.height}px`,
                            border: "none",
                            pointerEvents: "none",
                            display: "block",
                            background: "transparent",
                        }}
                    />
                </div>
            </div>
        </Rnd>
    )
}

const Handle = () => (
    <div
        className="z-30 h-4 w-4
       bg-white border-2 border-blue-500"
    />
);

export default DeviceFrame