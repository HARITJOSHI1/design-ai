import { tool } from "ai";
import z from "zod";

export const unsplashTool = tool({
    description: "Search for high-quality images from Unsplash. Use this when you need to add an <img> tag to the UI.",
    inputSchema: z.object({
        query: z.string().describe("The search query for the image (e.g. 'modern fitness app dashboard', 'abstract nature background')"),
        orientation: z.enum(["landscape", "portrait", "squarish"]).default("landscape")
    }),
    execute: async ({ query, orientation }) => {
        try {
            console.log("Searching Unsplash for:", query);
            const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1`, {
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Unsplash API error:", errorData);
                throw new Error(`Unsplash API error: ${res.statusText}`);
            }

            const data = await res.json();
            const results = data.results;

            console.log("RESULTS ", results);


            if (!results || results.length === 0) {
                console.warn("No images found for query:", query);
                return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"; // Fallback image
            }

            const imageUrl = results[0]?.urls?.regular;
            console.log("Found image:", imageUrl);
            return imageUrl;

        } catch (error) {
            console.error("Unsplash tool execution error:", error);
            return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"; // Fallback image instead of throwing
        }
    }
})