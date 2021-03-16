import React, { useContext, useEffect, useState } from 'react';
import { auth } from "../firebase";

//Create context for all of app to use 
const AuthContext = React.createContext();

//Function for using context across app

export function useAuth() {
  return useContext(AuthContext);
}

//Use auth context in provider and have it render it in all of its children
export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  };


  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false);
      setCurrentUser(user);

    });

    return unsubscribe;

  }, [])
 

  //provide all the info we want to provide with auth
  const value = {
    
    currentUser,
    signup,
    login
  
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )

}