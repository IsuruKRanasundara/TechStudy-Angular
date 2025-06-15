//Save data in the FireBase Database

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./FireBaseConfig";


async function saveUserData(data: any) {
    await setDoc(doc(collection(db, 'users'), data.objectID), {
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date().toISOString()
    });
}

async function saveLectureNoteData(data: any) {
    await setDoc(doc(collection(db, 'lectureNotes'), data.objectID), {
        title: data.title,
        technology: data.technology,
        content: data.content,
        createdAt: new Date().toISOString()
    });
            console.log('Lecture notes found:', data.title, data.technology, data.content, data.createdAt);

}
async function getUserDataByEmail(email: string) {
    const userDoc = doc(collection(db, 'users'), email);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
        return userSnapshot.data();
    } else {
        throw new Error('User not found');
    }
}


async function getAllLecNotes() {
    const lectureNotesCollection = collection(db, 'lectureNotes');
    const lectureNotesSnapshot = await getDocs(lectureNotesCollection);
    if (!lectureNotesSnapshot.empty) {
        console.log('Lecture notes found:', lectureNotesSnapshot.docs.length);
        return lectureNotesSnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    } else {
        console.log('No lecture notes found');
        return [];
    }
}
async function getLectureNoteByTechnology(technology: string) {
    const lectureNotesCollection = collection(db, 'lectureNotes');
    const lectureNotesSnapshot = await getDocs(lectureNotesCollection);
    if (!lectureNotesSnapshot.empty) {
        const lectureNotes = lectureNotesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return lectureNotes.filter((note: any) => note.technology === technology);
    } else {
       console.log('No lecture notes found');
       return [];
    }
}



export { saveUserData, saveLectureNoteData, getUserDataByEmail, getAllLecNotes, getLectureNoteByTechnology };
