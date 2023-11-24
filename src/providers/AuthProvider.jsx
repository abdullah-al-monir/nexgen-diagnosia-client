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
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
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
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      if (currentUser) {
        axiosPublic
          .post("/jwt", loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data) {
              setLoading(false);
            }

            console.log("token response", res.data);
          });
      } else {
        axiosPublic
          .post("/logout", loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data) {
              setLoading(false);
            }
            console.log(res.data);
          });
      }
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
    updateUserProfile,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
