import React from "react";
import RocketForm from "./RocketForm";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import RegisterForm from "./RegisterForm";
/*AuthProvider is a component that passes access to the authorization session to children. 
Because the session is accessed at different levels (for login, for logout, for sending data to the server, 
updating the user). */
import { AuthProvider } from "../authContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileContainer from "./ProfileContainer";

function AppRouter() {
  return (
    <div className="router">
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path={`/:id`} element={<RocketForm />}></Route>
            <Route path="/" exact element={<HomePage />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/profile" element={<ProfileContainer />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default AppRouter;
