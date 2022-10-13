import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";
const ProfileContainer = () => {
  const { profileData, uid } = useSelector((state) => state.userReducer);
  return (
    <div>
      {profileData.default ? null : (
        <UserProfile profileData={profileData} uid={uid} />
      )}
    </div>
  );
};

export default ProfileContainer;
