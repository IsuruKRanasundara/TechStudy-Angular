import { collection } from "firebase/firestore";
import { stringify } from "querystring";
import { FirebaseService } from "./FireBaseConfig";
// Ensure this path is correct based on your project structure
// Adjust the import based on your firebaseConfig file
const firebaseConfig = new FirebaseService();
const db = firebaseConfig.db;
// Get the Firestore database instance
const usersCollection = collection(db, "users");
class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor (firstName: string, lastName: string, email: string, password: string ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    toString() {
        return this.firstName + ', ' + this.lastName + ', ' + this.email + ', ' + this.password;
    }
}

// Firestore data converter
const userConverter = {
    toFirestore: (user: User) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new User(data.firstName, data.lastName, data.email, data.password);
    }
};

//Lecture Notes Class
class LectureNote {
    title: string;
    content: string;
    type: string; 
    level: string;
    technology: string;
    timestamp: Date;
    techStack: string;

    constructor(title: string, content: string, type: string, level: string, technology: string, timestamp: Date, techStack: string) {
        this.title = title;
        this.content = content;
        this.type = type;
        this.level = level;
        this.technology = technology;
        this.timestamp = timestamp;
        this.techStack = techStack;
    }

    toString() {
        return this.title + ', ' + this.content + ', ' + this.type + ', ' + this.level + ', ' + this.technology + ', ' + this.timestamp.toISOString() + ', ' + this.techStack;
    }
}

// Firestore data converter
const lectureNoteConverter = {
    toFirestore: (note: LectureNote) => {
        return {
            title: note.title,
            content: note.content,
            type: note.type,
            level: note.level,
            technology: note.technology,
            timestamp: note.timestamp,
            techStack: note.techStack
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new LectureNote(
            data.title,
            data.content,
            data.type,
            data.level,
            data.technology,
            data.timestamp,
            data.techStack
        );
    }
};

//ContactInFo class
class ContactInfo {
    user: User;
    inquiry: string;
    timestamp?: Date;
    subject: string;
    interestTechnology: string;
    message: string;
    isSubscribed: boolean;
    isAcceptedTerms: boolean;
    isContacted: boolean;

    constructor(
        user: User,
        inquiry: string,
        timestamp: Date | undefined,
        subject: string,
        interestTechnology: string,
        message: string,
        isSubscribed: boolean,
        isAcceptedTerms: boolean,
        isContacted: boolean
    ) {
        this.user = user;
        this.inquiry = inquiry;
        this.timestamp = timestamp;
        this.subject = subject;
        this.interestTechnology = interestTechnology;
        this.message = message;
        this.isSubscribed = isSubscribed;
        this.isAcceptedTerms = isAcceptedTerms;
        this.isContacted = isContacted;
    }

    toString(): string {
        return this.user.toString() + ', ' + this.inquiry + ', ' + (this.timestamp?.toISOString() ?? '') + ', ' + this.subject + ', ' + this.interestTechnology + ', ' + this.message + ', ' + this.isSubscribed + ', ' + this.isAcceptedTerms + ', ' + this.isContacted;
    }
}
// Firestore data converter for ContactInfo
const contactInfoConverter = {
    toFirestore: (contact: ContactInfo) => {
        return {
            user: contact.user,
            inquiry: contact.inquiry,
            timestamp: contact.timestamp,
            subject: contact.subject,
            interestTechnology: contact.interestTechnology,
            message: contact.message,
            isSubscribed: contact.isSubscribed,
            isAcceptedTerms: contact.isAcceptedTerms,
            isContacted: contact.isContacted
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return {
            user: data.user,
            inquiry: data.inquiry,
            timestamp: data.timestamp.toDate(),
            subject: data.subject,
            interestTechnology: data.interestTechnology,
            message: data.message,
            isSubscribed: data.isSubscribed,
            isAcceptedTerms: data.isAcceptedTerms,
            isContacted: data.isContacted
        } as ContactInfo;
    }
}; 
//TODO:Send the Data to the FireBase Backend