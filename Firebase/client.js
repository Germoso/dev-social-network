import "firebase/app"
import "firebase/auth"

import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, collection, getDocs, query } from "firebase/firestore"
import { getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBGyFTNwgSms7-WMlILbQpaVeJAWoRp54k",
    authDomain: "testing-firebase-ccedb.firebaseapp.com",
    projectId: "testing-firebase-ccedb",
    storageBucket: "testing-firebase-ccedb.appspot.com",
    messagingSenderId: "608731855852",
    appId: "1:608731855852:web:de15de252ac788ea6edec9",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const mapUser = (user) => {
    const { displayName, photoURL, uid } = user
    return { displayName, photoURL, uid }
}

export const preAuthUser = (setUser) => {
    onAuthStateChanged(auth, (user) => {
        console.log(user)
        if (user) {
            console.log("client")
            const currentUser = mapUser(user)
            setUser(currentUser)
        }
    })
}

export const loginWithGithub = () => {
    const githubProvider = new GithubAuthProvider()
    return signInWithPopup(auth, githubProvider)
}
const firestore = getFirestore(app)

const documento = doc(collection(firestore, "coleccion"))

export const createPost = (post) => {
    return setDoc(documento, post)
}

const consulta = query(collection(firestore, "coleccion"))

export const getTimeline = async () => {
    const coleccion = await getDocs(consulta)
    const data = []
    await coleccion.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id,
        })
    })
    return await data
}
