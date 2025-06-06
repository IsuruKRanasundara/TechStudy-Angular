import * as functions from 'firebase-functions';
import { registerUser } from './auth/registerUser';
import { addDocument } from './firestore/addDocument';

exports.registerUser = functions.https.onCall(registerUser);
exports.addDocument = functions.https.onCall(addDocument);
