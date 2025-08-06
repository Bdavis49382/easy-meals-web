import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { user } from "./stores.svelte";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function signUserIn() {
    const result = await signInWithPopup(auth, provider);
    const {email, displayName} = result.user;
    user.email = email;
    user.isLoggedIn = true;
    user.name = displayName;
} 

export async function signUserOut() {
    const result = await signOut(auth);
    user.email = '';
    user.name = '';
    user.isLoggedIn = false;
}

export async function getIssues() {
    const querySnapshot = await getDocs(collection(db, "issues"));
    const issues = []
    querySnapshot.forEach((doc) => {
        issues.push({...doc.data(), id:doc.id});
    });
    return issues;
}

export async function addIssue(issue) {
    await addDoc(collection(db,'issues'), {...issue, status:'Unresolved', createdAt: serverTimestamp()})
}

export async function updateIssue(id, title, text, status) {
    await updateDoc(doc(db, 'issues',id),{title,text, status});
}

export async function deleteIssue(id) {
    await deleteDoc(doc(db, 'issues', id));
}


onAuthStateChanged(auth, async (userData) => {
    if (userData) {
        const {email, displayName} = userData;
        user.email = email;
        user.isLoggedIn = true;
        user.name = displayName;
    } else {
        user.email = '';
        user.name = '';
        user.isLoggedIn = false;
    }
})

