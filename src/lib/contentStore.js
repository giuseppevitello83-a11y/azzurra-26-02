import db from "./firebase";
import fs from "fs";
import path from "path";

const COLLECTION = "site";
const DOC_ID = "content";
const SOURCE_PATH = path.join(process.cwd(), "src", "lib", "db.json");

/**
 * Reads site content from Firestore.
 * Falls back to local db.json if Firestore is not available.
 */
export async function getSiteContent() {
    // Try Firestore first
    if (db) {
        try {
            const doc = await db.collection(COLLECTION).doc(DOC_ID).get();
            if (doc.exists) {
                return doc.data();
            }
        } catch (e) {
            console.warn("[contentStore] Firestore read failed:", e.message);
        }
    }

    // Fallback: read from local db.json
    try {
        const raw = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf-8"));
        return raw.siteContent || {};
    } catch (e) {
        console.error("[contentStore] Could not read db.json:", e.message);
        return {};
    }
}

/**
 * Saves site content to Firestore.
 */
export async function saveSiteContent(newContent) {
    if (!db) {
        return { success: false, error: "Firebase non configurato" };
    }

    try {
        await db.collection(COLLECTION).doc(DOC_ID).set(newContent);
        console.log("[contentStore] Saved to Firestore");
        return { success: true };
    } catch (e) {
        console.error("[contentStore] Firestore write failed:", e.message);
        return { success: false, error: e.message };
    }
}

/**
 * Seeds Firestore with the initial data from db.json.
 */
export async function seedFirestore() {
    if (!db) {
        return { seeded: false, error: "Firebase non configurato. Aggiungi FIREBASE_SERVICE_ACCOUNT_KEY." };
    }

    try {
        const doc = await db.collection(COLLECTION).doc(DOC_ID).get();
        if (doc.exists) {
            return { seeded: false, message: "Dati già presenti in Firestore" };
        }

        const raw = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf-8"));
        await db.collection(COLLECTION).doc(DOC_ID).set(raw.siteContent);
        return { seeded: true, message: "Firestore popolato con i dati di db.json!" };
    } catch (e) {
        return { seeded: false, error: e.message };
    }
}
