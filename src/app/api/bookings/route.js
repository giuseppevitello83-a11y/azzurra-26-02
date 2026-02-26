import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const dbPath = path.join(process.cwd(), "src", "lib", "db.json");

function getDb() {
    if (!fs.existsSync(dbPath)) return { bookings: [] };
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();

    // If admin, return all bookings. If user, return only theirs.
    if (session.user.role === "admin") {
        return NextResponse.json(db.bookings || []);
    } else {
        return NextResponse.json((db.bookings || []).filter(b => b.userId === session.user.id));
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookingData = await request.json();
    const db = getDb();

    const newBooking = {
        id: `B${Date.now()}`,
        userId: session.user.id,
        status: "In attesa",
        ...bookingData
    };

    db.bookings = db.bookings || [];
    db.bookings.push(newBooking);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));

    return NextResponse.json(newBooking);
}
