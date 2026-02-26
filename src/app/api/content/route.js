import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export async function GET() {
    const content = getSiteContent();
    return NextResponse.json(content);
}

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const newContent = await request.json();
        saveSiteContent(newContent);
        return NextResponse.json({ message: "Content updated successfully", success: true });
    } catch (err) {
        console.error("[API Content] Save error:", err);
        return NextResponse.json({ error: "Failed to save content", details: err.message }, { status: 500 });
    }
}
