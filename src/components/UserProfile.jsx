import React, { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { db } from "../firebase.js";
import { setDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { removeUser } from "../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import AuthContext from "../authContext.js";

function UserProfile({ profileData, uid }) {
  const { logout } = useContext(AuthContext);
  const { ids, entities } = useSelector((state) => state.rocketsReducer);

  const [value, onChangeValue] = useState({
    name: profileData.name,
    surname: profileData.surname,
    urlUserpic: profileData.urlUserpic,
    mobile: profileData.mobile,
    favourites: profileData.favourites,
    default: false,
  });

  const handleChangeValue = useCallback(
    (inputValue) => {
      onChangeValue({
        ...value,
        ...inputValue,
      });
    },
    [value, onChangeValue]
  );

  const saveChanges = () => {
    const userColRef = doc(db, "users", uid);
    setDoc(userColRef, value);
    console.log(profileData, value);
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
              src={profileData.urlUserpic ?? value.urlUserpic}
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
                  placeholder={profileData.name ?? value.name}
                  onChange={(e) => handleChangeValue({ name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={profileData.surname ?? value.surname}
                  onChange={(e) =>
                    handleChangeValue({ surname: e.target.value })
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
                  placeholder={profileData.mobile ?? value.mobile}
                  onChange={(e) =>
                    handleChangeValue({ mobile: e.target.value })
                  }
                />
              </div>

              <div className="col-md-12">
                <label className="labels">URL Link to change Userpic</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={profileData.urlUserpic ?? value.urlUserpic}
                  onChange={(e) =>
                    handleChangeValue({ urlUserpic: e.target.value })
                  }
                />
              </div>

              <div className="col-md-12"></div>
              <div class="form-check">
                <label className="labels">Your favourite Dragons</label>
                <br />
                {ids.map((id) => {
                  return (
                    <div class="form-check py-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        defaultChecked={
                          profileData && profileData.favourites
                            ? profileData.favourites[id]
                            : false
                        }
                        value=""
                        key={id}
                        id="flexCheckDefault"
                        onChange={(e) =>
                          handleChangeValue({
                            favourites: {
                              ...value.favourites,
                              [id]: e.target.checked,
                            },
                          })
                        }
                      />
                      <label
                        class="form-check-label text-secondary"
                        for="flexCheckDefault"
                      >
                        {entities[id].name}
                      </label>
                    </div>
                  );
                })}
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
