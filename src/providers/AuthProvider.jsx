import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // const userEmail = currentUser?.email || user?.email;
      // const loggedUser = { email: userEmail };
      // if (currentUser) {
      //   axios
      //     .post("https://work-atlas-server.vercel.app/jwt", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       if (res.data) {
      //         setLoading(false);
      //       }

      //       console.log("token response", res.data);
      //     });
      // } else {
      //   axios
      //     .post("https://work-atlas-server.vercel.app/logout", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       if (res.data) {
      //         setLoading(false);
      //       }
      //       console.log(res.data);
      //     });
      // }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.email]);
  const authInfo = {
    user,
    setUser,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
