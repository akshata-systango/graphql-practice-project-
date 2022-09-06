import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBR5uEITo3jDO7ktkD5vUIXCw4q8dbMfvM",
    authDomain: "graphql-firebase-project.firebaseapp.com",
    databaseURL: "https://graphql-firebase-project-default-rtdb.firebaseio.com",
    projectId: "graphql-firebase-project",
    storageBucket: "graphql-firebase-project.appspot.com",
    messagingSenderId: "228111600782",
    appId: "1:228111600782:web:e5cf70a921fd00da678ddf"
}

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }