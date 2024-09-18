import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { Record } from "../models/record";

export interface IRecordRepository {
    createRecord(record: Record): Promise<FirebaseFirestore.DocumentReference>;
    updateRecordIncrementId(docId: string, incrementId: number): Promise<void>;
}

export class FirestoreRecordRepository implements IRecordRepository {
    private db = admin.firestore();

    async createRecord(record: Record): Promise<FirebaseFirestore.DocumentReference> {
        const recordRef = await this.db.collection("records").add({
            ...record,
            createdAt: FieldValue.serverTimestamp(),
        });
        return recordRef;
    }

    async updateRecordIncrementId(docId: string, incrementId: number): Promise<void> {
        const recordRef = this.db.collection("records").doc(docId);
        await recordRef.update({ increment_id: incrementId });
    }
}
