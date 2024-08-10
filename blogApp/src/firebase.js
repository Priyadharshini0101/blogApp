import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc,collection,getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD89L1TbOd7qcxsIvkRVwKUaGNE85FwTq4",
  authDomain: "blog-app-da277.firebaseapp.com",
  projectId: "blog-app-da277",
  storageBucket: "blog-app-da277.appspot.com",
  messagingSenderId: "99349410789",
  appId: "1:99349410789:web:eca64fe91e7a7a2251b50c",
  measurementId: "G-RR99VD7JKV"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name,email,password) =>{
    // try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
     
    // }catch(error){
        
    //    console.log(error.code.split('/')[1].split('-').join(" "))
    // }
}

const login = async (email,password)=>{
    // try{
        await signInWithEmailAndPassword(auth,email,password)
    // }catch(error){
    // console.log(error)
    // }
}

const logout = () =>{
    signOut(auth)
    console.log(auth)
}

export {auth,db,login,signup,logout}