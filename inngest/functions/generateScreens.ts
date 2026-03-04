import { inngest } from "@/inngest/client";
import { openRouter } from "@/lib/ai/openrouter";
import prisma from "@/lib/prisma";
import { ANALYSIS_PROMPT as ANALYSIS_SYSTEM_PROMPT, GENERATE_SCREEN_PROMPT, GENERATION_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { FrameType } from "@/lib/types/t.project";
import { generateText, Output, stepCountIs } from "ai";
import { AnalysisSchema } from "@/lib/ai/schemas/analysisSchema";
import { BASE_VARIABLES, THEME_LIST } from "@/lib/theme";
import { unsplashTool } from "../tools";


export const generateScreens = inngest.createFunction(
    { id: "generate-ui-screens" },
    { event: "ui/generate.screens" },
    async ({ event, step }) => {
        const { prompt, userId, projectId, frames, theme: existingTheme } = event.data;
        const isRegeneration = Array.isArray(frames) && frames.length > 0;

        const contextHTML = isRegeneration ? frames
            .slice(0, 4)
            .map((frame: FrameType) => frame.htmlContent)
            .join("\n") : "";

        const analysisPrompt = isRegeneration ?
            `   
            USER REQUEST: ${prompt}
            SELECTED THEME: ${existingTheme}
            CONTEXT HTML: ${contextHTML}`.trim() :

            `USER REQUEST: ${prompt}`.trim();


        // Analyse or plan
        const analysis = await step.run("analyse-and-plan-screen", async () => {

            const { output } = await generateText({
                model: openRouter.chat("google/gemini-2.5-flash-lite"),
                output: Output.object({
                    schema: AnalysisSchema,

                }),
                system: ANALYSIS_SYSTEM_PROMPT,
                prompt: analysisPrompt,
            });

            const themetoUse = isRegeneration ? existingTheme : output.theme;

            if (!isRegeneration) {
                await prisma.project.update({
                    where: {
                        id: projectId,
                        userId,
                    },
                    data: {
                        theme: themetoUse,
                    },
                });
            }

            return { ...output, themetoUse }
        });


        // After planning generate actual frames based on prev frame ctx

        for (let i = 0; i < analysis.screens.length; i++) {
            const screenPlan = analysis.screens[i];

            const selectedTheme = THEME_LIST.find((theme) => theme.id === analysis.themetoUse);

            // combine the theme styke + base vars

            const fullThemeCSS = `
            ${BASE_VARIABLES}
            ${selectedTheme?.style || ""}
            `;

            await step.run(`generate-screen-${i}`, async () => {

                const result = await generateText({
                    model: openRouter.chat("google/gemini-2.5-flash-lite"),
                    system: GENERATION_SYSTEM_PROMPT,
                    tools: {
                        searchUnsplash: unsplashTool
                    },
                    stopWhen: stepCountIs(5),
                    prompt: `
                        - Screen ${i + 1}/${analysis.screens.length}
                        - Screen ID: ${screenPlan.id}
                        - Screen Name: ${screenPlan.name}
                        - Screen Purpose: ${screenPlan.purpose}
                        - VISUAL DESCRIPTION: ${screenPlan.visualDescription}
                        - THEME STYLE (Use these for colors): ${fullThemeCSS}

                        ${GENERATE_SCREEN_PROMPT}
                        `.trim(),
                });

                let finalHtml = result.text ?? "";
                const match = finalHtml.match(/<div[^>]*>([\s\S]*)<\/div>/);

                finalHtml = match ? match[0] : finalHtml;
                finalHtml = finalHtml.replaceAll(/```/g, "");

                // Create Frame
                const frame = await prisma.frame.create({
                    data: {
                        projectId,
                        title: screenPlan.name,
                        htmlContent: finalHtml,
                    },
                });

                return { success: true, frame };
            });
        }
    },
);