import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Competition from '../../models/competition';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
const COMPETITIONS_COLLECTION = 'competitions';

class Firebase {
    // TODO: Fix types
    auth: any;
    firestore: any;

    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.firestore = app.firestore();
    }

    /** TODO: Temporary test function -> Remove */
    testCallback = (result: string) => {
        console.log(result);
    };

    doCreateUserWithEmailAndPassword = (email: string, password: string) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email: string, password: string) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password: string) => this.auth.currentUser.updatePassword(password);

    /**
     * Creates a new competition entry or updates an existing one
     * @param competition The competition object to create/update
     */
    doInsertCompetition = (competition: Competition) => {
        let competitionRef = this.firestore.collection(COMPETITIONS_COLLECTION).doc();
        competitionRef.set({
            ...competition,
            id: competitionRef.id,
        });
    };

    /**
     * Updates the competition object from firebase
     * @param competition
     */
    doUpdateCompetition = (competition: Competition) => {
        let competitionRef = this.firestore.collection(COMPETITIONS_COLLECTION).doc(competition.id);
        competitionRef.set(competition);
    };

    /**
     * Deletes the competition object from firebase
     * @param competition The competition object to delete
     */
    doDeleteCompetition = (competition: Competition) => {
        let competitionRef = this.firestore.collection(COMPETITIONS_COLLECTION).doc(competition.id);
        competitionRef.delete();
    };

    /**
     * Gets all the documentation in the specified competitions collection
     * @param callback The callback when the competitions collection is updated (returns the querySnapshot). Obtain
     * data by iterating through snapshot and calling .data().
     */
    receiveCompetitionUpdates = (callback: (querySnapshot: any /** TODO: Fix type */) => void) => {
        let query = this.firestore.collection(COMPETITIONS_COLLECTION);
        query.onSnapshot(
            (querySnapshot: any /** TODO: Fix type */) => {
                // console.log(querySnapshot)
                console.log(`Received query snapshot of size ${querySnapshot.size}`);
                // querySnapshot.forEach(doc => {
                //     console.log(doc.data())
                // })
                callback(querySnapshot);
            },
            (err: Error) => {
                console.log(`Encountered error: ${err}`);
                callback(null);
            },
        );
    };
}

export default Firebase;
