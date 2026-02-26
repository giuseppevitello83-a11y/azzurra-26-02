import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const dbPath = path.join(process.cwd(), "src", "lib", "db.json");

function getDb() {
    if (!fs.existsSync(dbPath)) return { siteContent: {} };
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

export async function GET() {
    const db = getDb();
    return NextResponse.json(db.siteContent || {});
}

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newContent = await request.json();
    const db = getDb();

    db.siteContent = newContent;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));

    return NextResponse.json({ message: "Content updated successfully" });
}
