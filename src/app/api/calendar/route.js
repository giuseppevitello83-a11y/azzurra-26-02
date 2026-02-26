import { NextResponse } from "next/server";
import { fetchICalEvents } from "@/lib/ical";
import fs from "fs";
import path from "path";

export async function GET() {
    const dbPath = path.join(process.cwd(), "src", "lib", "db.json");
    if (!fs.existsSync(dbPath)) return NextResponse.json([]);

    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    const icalUrl = db.siteContent?.contact?.icalUrl;

    if (!icalUrl) {
        // Return dummy data for testing if no URL provided
        return NextResponse.json([
            { start: "2026-02-28", end: "2026-03-05", summary: "Occupato" }
        ]);
    }

    const events = await fetchICalEvents(icalUrl);
    return NextResponse.json(events);
}
