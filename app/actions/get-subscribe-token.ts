"use server";

import { inngest } from "@/inngest/client";
import { getSubscriptionToken } from "@inngest/realtime";
import { auth } from "@clerk/nextjs/server";


export async function fetchRealtimeSubscriptionToken() {
    const user = await auth();
    if (!user || !user.userId) throw new Error("Unauthorized");


    const token = await getSubscriptionToken(inngest, {
        channel: `user:${user.userId}`,
        topics: ["frame.created", "analysis.start", "analysis.complete", "generation.start", "generation.complete"],
    });

    return token;
}