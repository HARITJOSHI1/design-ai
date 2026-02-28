import React, { CSSProperties } from 'react'
import { Skeleton } from '../ui/skeleton';

type Props = {
    style: CSSProperties;
}

const DeviceFrameSkeleton = ({ style }: Props) => {
    return (
        <div
            className="absolute origin-center rounded-[40px] overflow-hidden shadow-xl ring-2 ring-primary/30 backdrop-blur-[2px] border border-gray-100 dark:border-neutral-800 bg-linear-to-br from-white via-neutral-50 to-neutral-200 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-shadow duration-300"
            style={{
                width: 420,
                height: 800,
                ...style
            }}
        >
            {/* Top bar: Notch & status */}
            <div className="relative flex flex-col items-center px-0 pb-2 pt-4 bg-transparent">
                <div className="h-2.5 w-32 rounded-xl bg-neutral-200 dark:bg-neutral-700 mb-5 opacity-70" />
                <div className="w-28 h-1.5 rounded-xl bg-neutral-200 dark:bg-neutral-700 mb-1.5 opacity-80" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-100 dark:border-neutral-800 bg-transparent">
                <Skeleton className="h-7 w-7 rounded-xl bg-neutral-300/80 dark:bg-neutral-700/80 shadow-md" />
                <Skeleton className="h-5 w-40 rounded-lg bg-neutral-200/90 dark:bg-neutral-600/70" />
            </div>

            {/* Content */}
            <div className="p-7 pt-5 space-y-5 bg-transparent flex flex-col">
                <Skeleton className="h-7 w-3/4 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/60" />
                <Skeleton className="h-6 w-2/3 rounded-lg bg-neutral-200/70 dark:bg-neutral-700/50" />
                <div className="flex gap-2 mt-2">
                    <Skeleton className="h-4 w-1/4 rounded-full bg-neutral-200/75 dark:bg-neutral-700/50" />
                    <Skeleton className="h-4 w-1/5 rounded-full bg-neutral-200/75 dark:bg-neutral-700/50" />
                    <Skeleton className="h-4 w-1/6 rounded-full bg-neutral-200/75 dark:bg-neutral-700/50" />
                </div>
                <Skeleton className="h-52 w-full rounded-2xl shadow bg-neutral-200/85 dark:bg-neutral-700/60" />
            </div>

            {/* Bottom area, e.g. secondary content */}
            <div className="px-6 pb-6 pt-3 space-y-3 bg-transparent">
                <Skeleton className="h-4 w-full rounded bg-neutral-200/70 dark:bg-neutral-700/40" />
                <Skeleton className="h-4 w-5/6 rounded bg-neutral-200/65 dark:bg-neutral-700/40" />
                <div className="flex gap-2">
                    <Skeleton className="h-4 w-2/3 rounded bg-neutral-200/60 dark:bg-neutral-700/35" />
                    <Skeleton className="h-4 w-1/6 rounded bg-neutral-200/60 dark:bg-neutral-700/35" />
                </div>
            </div>

            {/* Home indicator (bottom bar) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col items-center gap-1">
                <div className="w-20 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 opacity-80 mb-0.5" />
            </div>
        </div>
    )
}

export default DeviceFrameSkeleton