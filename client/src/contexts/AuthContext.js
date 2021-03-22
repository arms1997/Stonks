import React, { useContext, useEffect, useState } from "react";
import ls from "local-storage";
import { auth } from "../firebase";
import {
  getUserBackend,
  updateUserBackend,
  likeTicker,
  updateLikeTicker,
  createWatchTicker,
  removeWatchTicker,
  updateWatchTicker,
} from "./Auth_Helpers";

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
  const [authUser, setAuthUser] = useState();
  const [updating, setUpdating] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return authUser.updateEmail(email);
  }

  function updatePassword(password) {
    return authUser.updatePassword(password);
  }

  //update user on the front end and back end server with user changes on profile page
  function updateUser(newUser) {
    setUpdating(true);

    const changes = Object.keys(newUser);
    const updates = [];

    if (changes.includes("password"))
      updates.push(updatePassword(newUser.password));
    if (changes.includes("user_email"))
      updates.push(updateEmail(newUser.user_email));
    //delete password information so it does not get sent to the backend by deleting in newUser object
    delete newUser.password;

    if (!(changes.includes("password") && changes.length === 1)) {
      updates.push(updateUserBackend(currentUser.user_id, newUser));
    }
    //return promise that updates currentUser object and firebase user
    return Promise.all(updates).then(() => {
      setUpdating(false);
      return setCurrentUser((prev) => {
        const updatedUser = { ...prev };
        changes.forEach((key) => {
          if (key === "password") return;
          updatedUser[key] = newUser[key];
        });
        return updatedUser;
      });
    });
  }

  function addLike(userId, ticker, company) {
    return likeTicker(userId, ticker, company)
      .then(({ data }) => {
        const { resources } = data;
        setCurrentUser((prev) => ({
          ...prev,
          likes: [...prev.likes, resources],
        }));
      })
      .catch((err) => console.error(err));
  }

  function updateLike(likeId, index) {
    return updateLikeTicker(likeId)
      .then(() => {
        const newLikesArr = [...currentUser.likes];
        newLikesArr[index]["is_active"] = !newLikesArr[index]["is_active"];
        setCurrentUser((prev) => ({ ...prev, likes: newLikesArr }));
      })
      .catch((err) => console.error(err));
  }

  function createWatch(userId, ticker, value) {
    return createWatchTicker(userId, ticker, value).then(({ data }) => {
      const { resources } = data;
      setCurrentUser((prev) => ({
        ...prev,
        watches: [...prev.watches, resources],
      }));
    });
  }

  function updateWatch(watchId, index, value) {
    return updateWatchTicker(watchId, value)
      .then(({ data }) => {
        const newWatchArr = [...currentUser.watches];
        newWatchArr[index] = data;
        setCurrentUser((prev) => ({
          ...prev,
          watches: newWatchArr,
        }));
      })
      .catch((err) => console.error(err));
  }

  function removeWatch(watchId, index) {
    return removeWatchTicker(watchId)
      .then(() => {
        const newWatchArr = [...currentUser.watches];
        newWatchArr[index]["is_active"] = !newWatchArr[index]["is_active"];
        setCurrentUser((prev) => ({ ...prev, watches: newWatchArr }));
      })
      .catch((err) => console.error(err));
  }

  function updatePreviousTickers(symbol, company) {
    const newHistory = [...currentUser.previousTickers, { symbol, company }];
    ls.set("previousTickers", newHistory);
    setCurrentUser((prev) => ({ ...prev, previousTickers: newHistory }));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);

      if (updating) {
        return;
      } else if (user) {
        getUserBackend(user.email)
          .then((backendUserData) => {
            const previousTickers = ls.get("previousTickers") || [];
            setCurrentUser({ ...backendUserData.data, previousTickers });
            setLoading(false);
          })
          .catch((err) => console.error(err));
      } else {
        setCurrentUser(user);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  //provide all the info we want to provide with auth
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUser,
    setCurrentUser,
    addLike,
    updateLike,
    createWatch,
    removeWatch,
    updateWatch,
    updatePreviousTickers,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
