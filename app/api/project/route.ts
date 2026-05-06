import { generateProjectName } from "@/app/actions/action";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const user = await auth();
    if (!user || !user.userId) throw new Error("Unauthorized");

    const projects = await prisma.project.findMany({
      where: {
        userId: user.userId,
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json(
      {
        error: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const user = await auth();
    if (!user || !user.userId) throw new Error("Unauthorized");
    if (!prompt) throw new Error("Missing prompt");

    const userId = user.userId;
    const projectName = await generateProjectName(prompt);

    const project = await prisma.project.create({
      data: {
        userId,
        name: projectName,
      },
    });

    // Trigger inngest event to create a demo screen
    await inngest.send({
      name: "ui/generate.screens",
      data: {
        prompt,
        userId: user.userId,
        projectId: project.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (err) {
    console.log("Error occured", err);

    return NextResponse.json(
      {
        error: "Failed to create a project",
      },
      { status: 500 }
    );
  }
}
