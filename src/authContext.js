import React, { createContext, useCallback } from "react";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { removeUser, setUser } from "./slices/userSlice";

const AuthContext = createContext({
  auth: {},
  login: () => {},
});

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      const userColRef = doc(db, "users", currentUser.uid);
      getDoc(userColRef)
        .then((userData) => {
          dispatch(
            setUser({
              uid: currentUser.uid,
              token: currentUser.accessToken,
              isAuthorized: currentUser.auth._isInitialized,
              profileData: userData.data(),
            })
          );
        })
        .catch((err) => console.log(err));
    }
    return;
  });

  const login = useCallback(
    (email, password) => {
      setPersistence(auth, browserSessionPersistence);
      signInWithEmailAndPassword(auth, email, password) // Here we get respond from Firebase server with unique UID
        .then(({ user }) => {
          // We need it to make request to Firestore to collect the rest
          const userColRef = doc(db, "users", user.uid); // of User data
          getDoc(userColRef)
            .then((userData) => {
              // We combine information from both requests and dispatch it to state
              dispatch(
                setUser({
                  uid: user.uid,
                  token: user.accessToken,
                  isAuthorized: user.auth._isInitialized,
                  profileData: userData.data(),
                })
              );
            })
            .catch((err) => console.log(err));
          navigate("/");
        })
        .catch(() => alert("Invalid user!"));
    },
    [auth]
  );

  const logout = useCallback(() => {
    auth.signOut().then(() => {
      dispatch(removeUser());
      navigate("/");
    });
  }, [auth]);

  const value = {
    auth,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
