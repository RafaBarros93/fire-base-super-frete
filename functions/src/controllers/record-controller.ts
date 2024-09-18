import { IRecordRepository } from '../services/record-repository';
import { IdGenerator } from '../utils/id-generator';
import { Record } from '../models/record';

export class RecordController {
    constructor(
        private recordRepository: IRecordRepository,
        private idGenerator: IdGenerator
    ) { }

    async createNewRecord(name: string): Promise<FirebaseFirestore.DocumentReference> {
        const record: Record = { name };

        // Cria o registro
        const recordRef = await this.recordRepository.createRecord(record);

        // Gera o próximo increment_id
        const nextId = await this.idGenerator.generateNextId();

        // Atualiza o registro com o increment_id
        await this.recordRepository.updateRecordIncrementId(recordRef.id, nextId);

        return recordRef;
    }
}
