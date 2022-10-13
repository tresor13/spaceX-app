import React, {createContext, useCallback, useState} from "react";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "../utils/firebase";
import {removeUser, setUser, updateUserProfileData} from "../slices/userSlice";
import profileDataValidator from "../utils/profileDataValidator";

const AuthContext = createContext({
  auth: {},
  login: () => {},
});

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [ errors, onChangeErrors ] = useState({});
  const navigate = useNavigate();

  auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      console.log(currentUser);
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
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
              navigate("/");
            });
        })
        .catch(() => alert("Invalid user!"));
    },
    [auth, dispatch, navigate]
  );

  const logout = useCallback(() => {
    auth.signOut().then(() => {
      dispatch(removeUser());
      navigate("/");
    });
  }, [auth, dispatch, navigate]);


  const saveChanges = useCallback((userInputData, uid) => {
    onChangeErrors({});
    const validatedData = profileDataValidator(userInputData);
    if (validatedData.hasErrors) {
      onChangeErrors(validatedData.errors);
      return;
    }
    const userColRef = doc(db, "users", uid);
    updateDoc(userColRef, validatedData.user)
      .then(() => {
        dispatch(updateUserProfileData(validatedData.user));
      });
  }, [dispatch]);

  const authDataContext = {
    auth,
    errors,
    saveChanges,
    logout,
    login,
  };

  return (
    <AuthContext.Provider value={authDataContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
