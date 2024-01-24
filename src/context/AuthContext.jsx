import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";  
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext()

export function AuthContextProvider({children}) {
  const [user, setUser] = useState({})

  // Sign up function
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    setDoc(doc(db, 'users', email), {
      savedShows: []
    })
  }

  // Log in function
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Log out function
  function logOut() {
    return signOut(auth)
  }

  // State change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  })

  return(
    <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
      {children}
    </AuthContext.Provider>
  )
  
}

export function UserAuth() {
  return useContext(AuthContext)
}