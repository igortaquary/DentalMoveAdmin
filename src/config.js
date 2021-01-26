import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBtBjwtNGeHOMEJtqp6VyiKwt06drh0BFI",
    authDomain: "dentalmove-6518b.firebaseapp.com",
    projectId: "dentalmove-6518b",
    storageBucket: "dentalmove-6518b.appspot.com",
    messagingSenderId: "309711858372",
    appId: "1:309711858372:web:0ade88b86d2db17862f791"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

/*
db.enablePersistence().catch(function(err) {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        console.log('(firebase) Persistence error: multiple tabs open');
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log('(firebase) Persistence error: browser does not support')
    }
}); 
*/

export { db, firebase }
