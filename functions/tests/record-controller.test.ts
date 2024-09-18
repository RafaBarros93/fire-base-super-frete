import * as admin from 'firebase-admin';
import { RecordController } from '../src/controllers/record-controller';
import { FirestoreService } from '../src/services/firestore-service';
import { FirestoreRecordRepository } from '../src/services/record-repository';
import { IdGenerator } from '../src/utils/id-generator';



function runSimpleRecordControllerTest() {
    admin.initializeApp();

    console.log('Running Simple RecordController Test...');



    const firestoreService = new FirestoreService();
    const repository = new FirestoreRecordRepository();
    const idGenerator = new IdGenerator(firestoreService);

    const controller = new RecordController(repository, idGenerator);


    controller.createNewRecord('Mock User').then((result: any) => {
        console.assert(result.name === 'Mock User', 'Failed: Name should be "Mock User"');
        console.assert(result.increment_id === 11, 'Failed: Increment ID should be 11'); // O próximo ID deveria ser 11
        console.log('Simple RecordController Test Passed!');
    }).catch((err) => {
        console.error('Error in Simple RecordController Test:', err);
    });
}

// Rodando o teste
runSimpleRecordControllerTest();
