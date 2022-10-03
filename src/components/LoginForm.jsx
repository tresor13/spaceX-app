import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { auth } from "../firebase.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { setUser } from "../slices/userSlice.js";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
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
  }, []);

  const handleLogin = (email, password) => {
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
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header ">
          <h5 className="modal-title" id="loginModalLabel">
            Login or
          </h5>
          <button
            type="button"
            className="btn btn-outline-info mx-2"
            data-bs-dismiss="modal"
          >
            <Link to={`/register`} className="nav-link" role={"button"}>
              Register
            </Link>
          </button>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3 row">
            <label for="inputEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                value={email}
                type="email"
                className="form-control"
                id="inputEmail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label for="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                value={pass}
                type="password"
                className="form-control"
                id="inputPassword"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={() => handleLogin(email, pass)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
