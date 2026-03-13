import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Browser } from "puppeteer-core";

const CHROMIUM_PACK_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chromium-pack.tar`
    : "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";


// Cache the Chromium executable path to avoid re-downloading on subsequent requests
let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

/**
 * Downloads and caches the Chromium executable path.
 * Uses a download promise to prevent concurrent downloads.
 */
async function getChromiumPath(): Promise<string> {
    // Return cached path if available
    if (cachedExecutablePath) return cachedExecutablePath;

    // Prevent concurrent downloads by reusing the same promise
    if (!downloadPromise) {
        const chromium = (await import("@sparticuz/chromium-min")).default;
        downloadPromise = chromium
            .executablePath(CHROMIUM_PACK_URL)
            .then((path) => {
                cachedExecutablePath = path;
                console.log("Chromium path resolved:", path);
                return path;
            })
            .catch((error) => {
                console.error("Failed to get Chromium path:", error);
                downloadPromise = null; // Reset on error to allow retry
                throw error;
            });
    }

    return downloadPromise;
}


export async function POST(request: NextRequest) {

    let browser: Browser;
    try {

        const session = getKindeServerSession();
        const user = await session.getUser();

        if (!user) throw new Error("Unauthorized");

        const { html, width = 800, height = 600, projectId } = await request.json();
        console.log(projectId);

        const isProd = process.env.NODE_ENV === "production";

        const isVercel = process.env.VERCEL;

        let puppeteer: any;
        let launchOptions: any = {
            headless: true
        }

        if (isProd && isVercel) {
            const chromium = (await import("@sparticuz/chromium-min")).default;
            puppeteer = await import("puppeteer-core");

            const executablePath = await getChromiumPath();

            launchOptions = {
                ...launchOptions,
                executablePath,
                args: [...chromium.args, "--no-sandbox"],
            };
        } else {
            puppeteer = await import("puppeteer");
        }

        browser = await puppeteer.launch(launchOptions);

        const page = await browser.newPage();

        await page.setViewport({ width: Number(width), height: Number(height), deviceScaleFactor: 2 });

        await page.setContent(html, { waitUntil: "domcontentloaded" });

        await new Promise((r) => setTimeout(r, 500));

        const buffer = await page.screenshot({
            fullPage: false,
            type: "png",
        });

        const pngBuffer = Buffer.from(buffer);

        if (projectId) {
            const base64 = pngBuffer.toString("base64");

            await prisma.project.update({
                where: {
                    id: projectId,
                },
                data: {
                    thumbnail: `data:image/png;base64,${base64}`,
                },
            });
        }

        return new NextResponse(pngBuffer, {
            headers: {
                "Content-Type": "image/png",
                "Content-Disposition": "inline",
            },
        });
    }

    catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            error: "Failed to capture screenshot",
        }, { status: 500 });
    }

    finally {
        // @ts-ignore
        if (browser) await browser.close();
    }

}