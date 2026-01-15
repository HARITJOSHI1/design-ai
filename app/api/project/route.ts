import { generateProjectName } from "@/app/actions/action";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const session =  getKindeServerSession();
    const user = await session.getUser();

    if (!user) throw new Error("Unauthorized");

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
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

    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) throw new Error("Unauthorized");
    if (!prompt) throw new Error("Missing prompt");

    const userId = user.id;
    const projectName = await generateProjectName(prompt);

    const project = await prisma.project.create({
      data: {
        userId,
        name: projectName,
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
