import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { FirestoreService } from './services/firestore-service';
import { FirestoreRecordRepository } from './services/record-repository';
import { IdGenerator } from './utils/id-generator';
import { RecordController } from './controllers/record-controller';

admin.initializeApp();

// Instanciação de serviços
const firestoreService = new FirestoreService();
const recordRepository = new FirestoreRecordRepository();
const idGenerator = new IdGenerator(firestoreService);
const recordController = new RecordController(recordRepository, idGenerator);

// Função HTTP para criar um novo registro
export const createRecordFunction = functions.https.onRequest(async (req, res): Promise<any> => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send('Missing "name" parameter.');
        }

        // Chama o controlador para criar o registro
        const newRecordRef = await recordController.createNewRecord(name);
        res.status(200).send(`Record created with ID: ${newRecordRef.id}`);
    } catch (error) {
        console.log(error)
        res.status(500).send(`Error creating record: ${error.message}`);
    }
});
