import { tool } from "ai";
import z from "zod";

export const unsplashTool = tool({
    description: "Search for high-quality images from Unsplash. Use this when you need to add an <img> tag.",
    inputSchema: z.object({
        query: z.string().describe(""),
        orientation: z.enum(["landscape", "portrait", "squarish"]).default("landscape")
    }),
    execute: async ({ query, orientation }) => {
        try {
            const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1`, {
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
                }
            });

            const { results } = await res.json();

            if (!results || results.length === 0) throw new Error("No images found");

            const image = results[0];

            return results?.[0]?.urls?.regular || "";

        } catch (error) {
            console.error("Unsplash tool error:", error);
            throw new Error("Failed to fetch image from Unsplash");
        }
    }
})