import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    const { getSiteContent } = await import("@/lib/contentStore");
    const content = await getSiteContent();
    return NextResponse.json(content);
}

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { saveSiteContent } = await import("@/lib/contentStore");
        const newContent = await request.json();
        const result = await saveSiteContent(newContent);

        if (result.success) {
            return NextResponse.json({ message: "Salvato su Firebase!", success: true });
        } else {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
