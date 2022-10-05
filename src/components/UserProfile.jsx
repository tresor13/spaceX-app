import React, { useContext, useCallback } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

import AuthContext from "../authContext.js";
import profileDataValidator from "../utils/profileDataValidator.js";

function UserProfile({ profileData, uid }) {
  const { logout } = useContext(AuthContext);
  const { ids, entities } = useSelector((state) => state.rocketsReducer);

  const [userInputData, setUserInputData] = useState({
    name: profileData.name,
    surname: profileData.surname,
    urlUserpic: profileData.urlUserpic,
    mobile: profileData.mobile,
    favourites: profileData.favourites,
    default: false,
  });

  const handleChangeValue = useCallback(
    (inputValue) => {
      setUserInputData({
        ...userInputData,
        ...inputValue,
      });
    },
    [userInputData, setUserInputData]
  );

  const saveChanges = () => {
    const validatedData = profileDataValidator(userInputData);
    if (validatedData === false) {
      return;
    }
    const userColRef = doc(db, "users", uid);
    setDoc(userColRef, validatedData).then(() => window.location.reload());
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
              src={profileData.urlUserpic ?? userInputData.urlUserpic}
            />

            <span> </span>
          </div>
        </div>
        <div className="col-md-8 border-right">
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
                  value={userInputData.name}
                  placeholder={profileData.name ?? userInputData.name}
                  onChange={(e) => handleChangeValue({ name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  value={userInputData.surname}
                  className="form-control"
                  placeholder={profileData.surname ?? userInputData.surname}
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
                  value={userInputData.mobile}
                  type="text"
                  className="form-control"
                  placeholder={profileData.mobile ?? userInputData.mobile}
                  onChange={(e) =>
                    handleChangeValue({ mobile: e.target.value })
                  }
                />
              </div>

              <div className="col-md-12">
                <label className="labels">URL Link to change Userpic</label>
                <input
                  value={userInputData.urlUserpic}
                  type="text"
                  className="form-control"
                  placeholder={
                    profileData.urlUserpic ?? userInputData.urlUserpic
                  }
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
                              ...userInputData.favourites,
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
