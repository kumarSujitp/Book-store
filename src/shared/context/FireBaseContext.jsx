import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { createContext, useContext, useState } from "react";
import {addDoc, collection, Firestore, getDoc, getDocs, getFirestore, getStorage} from "firebase/firestore"
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


const fireBaseContext=createContext();

const FireBaseProvider=({children})=>{

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU4kiMyUfJfzGRem1qknip4UHxre8Nsj4",
  authDomain: "book-store-c2275.firebaseapp.com",
  projectId: "book-store-c2275",
  storageBucket: "book-store-c2275.firebasestorage.app",
  messagingSenderId: "450532898207",
  appId: "1:450532898207:web:07f35ad26e3eb5980c79aa"
};
  
  // Initialize Firebase
  const fireBaseApp = initializeApp(firebaseConfig);
  const firebaseAuth=getAuth(fireBaseApp)
  const fireStore=getFirestore(fireBaseApp)
  // const storage=getStorage(fireBaseApp);

  const createUserUsingEmailPassword=(email,password)=>{
    return createUserWithEmailAndPassword(firebaseAuth,email,password);
  }

  const updateUserProfile = (user, firstName, lastName) => {
    return updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });
  };
  
  const saveUserToFirestore = (user, firstName, lastName) => {
    return setDoc(doc(fireStore, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email: user.email,
      createdAt: new Date(),
    });
  };
  

  const loginWithEmailPassword=(email,password)=>{
    return signInWithEmailAndPassword(firebaseAuth,email,password)
  }

  const createBookStore = async (name, isbn, price) => {
    return await addDoc(collection(fireStore, 'books'), {
      name,
      isbn, price
    })
  }

    const fetchBooks = async () => {
    const snapshot = await getDocs(collection(fireStore, "books"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  };

  const contextValue={
    createUserUsingEmailPassword,
    loginWithEmailPassword,
    createBookStore,
    fetchBooks,
    updateUserProfile,
    saveUserToFirestore
  }

    return(<fireBaseContext.Provider value={contextValue}>
        {children}
    </fireBaseContext.Provider>);
    
}

export default FireBaseProvider;

export const useFireBase=()=>useContext(fireBaseContext)
