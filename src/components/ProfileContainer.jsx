import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
const ProfileContainer = () => {
  const { profileData, uid } = useSelector((state) => state.userReducer);
  return (
    <div>
      {profileData ? <UserProfile profileData={profileData} uid={uid} /> : null}
    </div>
  );
};

export default ProfileContainer;
