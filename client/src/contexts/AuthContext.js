import React, { useContext, useEffect, useState } from 'react';
import { auth } from "../firebase";
import { getUserBackend } from './Auth_Helpers';

//Create context for all of app to use 
const AuthContext = React.createContext();

//Function for using context across app

export function useAuth() {
  return useContext(AuthContext);
}

//Use auth context in provider and have it render it in all of its children
export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  };


  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  };

  function logout() {
    return auth.signOut()
  };

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  };


  function updateEmail(email) {
    return currentUser.updateEmail(email);
  };

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
    
    //make request to backend to add user likes/watches to currentUser object

    if (user) {
      getUserBackend(user.email)
       .then((backendUserData) => {
         user["likes"] = backendUserData.data.likes;
         user["watches"] = backendUserData.data.watches;
         user["username"] = backendUserData.data.username;
         user["user_id"] = backendUserData.data.user_id;
         user["user_phone_num"] = backendUserData.data.user_phone_num;
       })
       .then(() => {
         setCurrentUser(user);
         setLoading(false);
        })
       .catch(err => console.log(err))

    } else {
      setCurrentUser(user);
      setLoading(false);
    }
      // setLoading(false);
    });

    return unsubscribe;

  }, [])
 

  //provide all the info we want to provide with auth
  const value = {
    
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    setCurrentUser
  
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )

}