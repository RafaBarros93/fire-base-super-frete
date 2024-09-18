import { FirestoreService } from '../services/firestore-service';

export class IdGenerator {
    constructor(private firestoreService: FirestoreService) { }

    async generateNextId(): Promise<number> {
        return await this.firestoreService.getNextIncrementId();
    }
}
