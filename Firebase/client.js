import "firebase/app"
import "firebase/auth"

import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, collection, getDocs, query, deleteDoc, orderBy, addDoc } from "firebase/firestore"
import { getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { getStorage, ref, uploadBytes } from "firebase/storage"

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
const storage = getStorage()

export const mapUser = (user) => {
    const { displayName, photoURL, uid } = user
    return { displayName, photoURL, uid }
}

export const preAuthUser = (setUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
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
    return addDoc(collection(firestore, "coleccion"), post)
}

export const getTimeline = async (sort) => {
    const consulta = query(collection(firestore, "coleccion"), orderBy(sort, "desc"))
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

export const signout = () => {
    return signOut(auth)
}

export const uploadImage = (file) => {
    const fileRef = ref(storage, `images/${file.name}`)
    return uploadBytes(fileRef, file)
}

export const deletePost = async (id) => {
    deleteDoc(doc(firestore, "coleccion", id))
}

export const likePost = (id, likes) => {
    setDoc(doc(firestore, "coleccion", id), { likes: [...likes] }, { merge: true })
}
