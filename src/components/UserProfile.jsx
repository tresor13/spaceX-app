import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { db } from "../firebase.js";
import { auth } from "../firebase.js";
import { setDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { removeUser } from "../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const defaultUserpic =
  "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profileData, uid } = useSelector((state) => state.userReducer);
  const { ids, entities } = useSelector((state) => state.rocketsReducer);

  const [newName, setName] = useState("");
  const [urlUserpick, setUrl] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  // const [favourites, setFavourites] = useState();

  // const rockets = ids.reduce((acc, rocketId) => {
  //   return (acc[rocketId] = false);
  // }, {});

  const saveChanges = () => {

    const userColRef = doc(db, "users", uid);
    setDoc(userColRef, { name: newName ?? profileData.name, urlUserpick ?? profileData.urlUserpick, surname ?? profileData.surname, mobile ?? profileData.surname });
  };

  const logout = async () => {
    console.log(newName, urlUserpick, surname, mobile);
    // await signOut(auth);
    // dispatch(removeUser);
    // navigate("/");
    // window.location.reload();
  };
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              alt="userpic"
              className="rounded-circle mt-5"
              width="150px"
              src={profileData?.urlUserpick || defaultUserpic}
            />

            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={profileData?.name ?? "Name"}
                  onChange={(e) => setName(e.target.value ?? profileData.name)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={profileData?.surname ?? "Surname"}
                  onChange={(e) =>
                    setSurname(e.target.value ?? profileData.surname)
                  }
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={profileData?.mobile ?? "0000000000"}
                  onChange={(e) =>
                    setMobile(e.target.value ?? profileData.mobile)
                  }
                />
              </div>

              <div className="col-md-12">
                <label className="labels">URL Link to change Userpic</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={profileData?.urlUserpick ?? defaultUserpic}
                  onChange={(e) =>
                    setUrl(e.target.value ?? profileData.urlUserpick)
                  }
                />
              </div>

              <div className="col-md-12"></div>
              <div class="form-check">
                <label className="labels">Your favourite Dragons</label>
                <br />
                {/* {ids.map((id) => {
                  return (
                    <div class="form-check py-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        defaultChecked={favourites[id]}
                        value=""
                        id="flexCheckDefault"
                        onChange={console.log(rockets)}
                      />
                      <label
                        class="form-check-label text-secondary"
                        for="flexCheckDefault"
                      >
                        {entities[id].name}
                      </label>
                    </div>
                  );
                })} */}
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={() => saveChanges()}
              >
                Save Profile
              </button>
            </div>
            <div className="mt-5 text-center">
              <button
                className="btn btn-danger profile-button"
                type="button"
                onClick={logout}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
