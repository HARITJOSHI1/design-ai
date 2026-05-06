import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await auth();
    if (!user || !user.userId) throw new Error("Unauthorized");

    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: {
        id,
        userId: user.userId,
      },
      include: {
        frames: true,
      },
    });

    if (!project)
      return NextResponse.json(
        {
          error: "Project not found",
        },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      data: project,
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


export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { prompt } = await req.json();
    const { id } = await params;

    const user = await auth();
    if (!user || !user.userId) throw new Error("Unauthorized");
    if (!prompt) throw new Error("Missing prompt");

    const userId = user.userId;
    const project = await prisma.project.findFirst({
      where: {
        id,
        userId,
      },
      include: { frames: true }
    });

    if (!project) throw new Error("Project not found");



    await inngest.send({
      name: "ui/generate.screens",
      data: {
        prompt,
        userId: user.userId,
        projectId: project.id,
        frames: project.frames,
        theme: project.theme,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log("Error occured", err);

    return NextResponse.json(
      {
        error: "Failed to generate a frame",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { themeId } = await req.json();
    const { id } = await params;

    const user = await auth();
    if (!user || !user.userId) throw new Error("Unauthorized");
    if (!themeId) throw new Error("Missing theme");

    const userId = user.userId;
    const project = await prisma.project.update({
      where: {
        id,
        userId,
      },
      data: {
        theme: themeId,
      },
    });


    return NextResponse.json({
      success: true,
      project
    });
  } catch (err) {
    console.log("Error occured", err);
    return NextResponse.json(
      {
        error: "Failed to update the project",
      },
      { status: 500 }
    );
  }
}