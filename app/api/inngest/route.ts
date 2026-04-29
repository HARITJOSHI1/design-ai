import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions/helloWorld";
import { generateScreens } from "@/inngest/functions/generateScreens";

// Create an API that serves zero functions

export const maxDuration = 300;

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld,
        generateScreens
    ],
});