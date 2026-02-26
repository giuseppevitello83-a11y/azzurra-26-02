import fs from "fs";
import path from "path";

const RUNTIME_PATH = "/tmp/azzurra-content.json";
const SOURCE_PATH = path.join(process.cwd(), "src", "lib", "db.json");

/**
 * Reads site content. Checks /tmp/ first (runtime edits),
 * then falls back to the source db.json (build-time data).
 */
export function getSiteContent() {
    // 1. Try reading runtime overrides from /tmp/
    try {
        if (fs.existsSync(RUNTIME_PATH)) {
            const data = JSON.parse(fs.readFileSync(RUNTIME_PATH, "utf-8"));
            if (data && Object.keys(data).length > 0) {
                return data;
            }
        }
    } catch (e) {
        console.warn("[contentStore] Could not read runtime content:", e.message);
    }

    // 2. Fall back to source db.json
    try {
        const db = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf-8"));
        return db.siteContent || {};
    } catch (e) {
        console.error("[contentStore] Could not read source db.json:", e.message);
        return {};
    }
}

/**
 * Reads the full database (users, bookings, siteContent).
 */
export function getFullDb() {
    try {
        return JSON.parse(fs.readFileSync(SOURCE_PATH, "utf-8"));
    } catch (e) {
        return { users: [], bookings: [], siteContent: {} };
    }
}

/**
 * Saves site content to /tmp/ (works on Vercel).
 * Also attempts to write to source db.json (works locally).
 */
export function saveSiteContent(newContent) {
    // Always write to /tmp/ (works on Vercel + local)
    try {
        fs.writeFileSync(RUNTIME_PATH, JSON.stringify(newContent, null, 2));
        console.log("[contentStore] Saved to /tmp/ successfully");
    } catch (e) {
        console.error("[contentStore] Failed to write to /tmp/:", e.message);
    }

    // Also try to write to source db.json (works locally, fails silently on Vercel)
    try {
        const db = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf-8"));
        db.siteContent = newContent;
        fs.writeFileSync(SOURCE_PATH, JSON.stringify(db, null, 4));
        console.log("[contentStore] Saved to source db.json");
    } catch (e) {
        // Expected to fail on Vercel, that's OK
        console.warn("[contentStore] Could not write to source db.json (expected on Vercel):", e.message);
    }
}
