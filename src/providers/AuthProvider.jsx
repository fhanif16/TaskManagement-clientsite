import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.init';





export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(true);

    const name ="ekra";

    const createUser =(email, password) => {
      setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        

    }

    const signInUser = (email, password) => {
      setLoading(true);
     return signInWithEmailAndPassword(auth, email, password)

    }

    const signOutUser = () =>{
      return signOut(auth)
    }

    const signUpGoogle =(googleProvider) => {
        return  signInWithPopup(auth, googleProvider)
    }


    useEffect (() => {
     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
     // console.log(currentUser)
      setUser(currentUser)
      setLoading(false)
        
      });

      return () => {
        unSubscribe();
      }
    }, [])

    const authInfo = {
       name, createUser, signInUser, user, signOutUser, loading, signUpGoogle,
    }


    
    return (
      <AuthContext.Provider value={authInfo}>
        {children}

   




      </AuthContext.Provider>
    );
};

export default AuthProvider;