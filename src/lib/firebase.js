import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let firestoreDb = null;

function initFirebase() {
    if (firestoreDb) return firestoreDb;

    if (getApps().length > 0) {
        firestoreDb = getFirestore();
        return firestoreDb;
    }

    const keyJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!keyJson || keyJson === "{}") {
        console.warn("[Firebase] No service account key found. Using fallback mode.");
        return null;
    }

    try {
        const serviceAccount = JSON.parse(keyJson);

        initializeApp({
            credential: cert(serviceAccount),
            projectId: serviceAccount.project_id,
        });

        firestoreDb = getFirestore();
        return firestoreDb;
    } catch (e) {
        console.error("[Firebase] Init failed:", e.message);
        return null;
    }
}

export default initFirebase();
