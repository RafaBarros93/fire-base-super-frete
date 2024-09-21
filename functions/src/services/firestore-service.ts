import * as admin from 'firebase-admin';

export class FirestoreService {
    private db = admin.firestore();

    async getNextIncrementId(): Promise<number> {
        const incrementRef = this.db.collection('metadata').doc('increment');
        let nextId = 1;

        await this.db.runTransaction(async (transaction) => {
            const { exists, data } = await transaction.get(incrementRef);

            if (exists) nextId = data()!.lastId++ || 1;

            transaction.set(incrementRef, { lastId: nextId }, { merge: true });
        });

        return nextId;
    }
}
