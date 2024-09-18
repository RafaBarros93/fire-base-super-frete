import { FieldValue } from "firebase-admin/firestore";


export interface Record {
    id?: string; // ID gerado pelo Firestore
    name: string; // Nome do registro
    increment_id?: number; // ID incremental
    createdAt?: FieldValue; // Data de criação
}
