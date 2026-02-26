import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/seed — Populates Firestore with initial db.json data
export async function GET() {
    // Import dynamically to avoid build-time Firebase initialization
    const { seedFirestore } = await import("@/lib/contentStore");
    const result = await seedFirestore();
    return NextResponse.json(result);
}
