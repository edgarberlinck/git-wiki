import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, repoUrl, repoOwner, repoName, isPublic } = body;

    if (!name || !repoUrl || !repoOwner || !repoName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const wiki = await prisma.wiki.create({
      data: {
        name,
        description,
        repoUrl,
        repoOwner,
        repoName,
        isPublic: isPublic || false,
        userId: session.user.id,
      },
    });

    return NextResponse.json(wiki, { status: 201 });
  } catch (error) {
    console.error("Error creating wiki:", error);
    return NextResponse.json(
      { error: "Failed to create wiki" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wikis = await prisma.wiki.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(wikis);
  } catch (error) {
    console.error("Error fetching wikis:", error);
    return NextResponse.json(
      { error: "Failed to fetch wikis" },
      { status: 500 }
    );
  }
}
