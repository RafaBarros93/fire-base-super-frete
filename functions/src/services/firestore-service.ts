import * as admin from 'firebase-admin';

export class FirestoreService {
    private db = admin.firestore();

    async getNextIncrementId(): Promise<number> {
        const incrementRef = this.db.collection('metadata').doc('increment');
        let nextId = 1;

        await this.db.runTransaction(async (transaction) => {
            const incrementDoc = await transaction.get(incrementRef);

            if (incrementDoc.exists) {
                nextId = incrementDoc.data()?.lastId + 1 || 1;
            }

            transaction.set(incrementRef, { lastId: nextId }, { merge: true });
        });

        return nextId;
    }
}
