import React from "react";
import RocketForm from "./RocketForm";
import HomePage from "./HomePage";
import ItemsList from "./ItemsList";
import RegisterForm from "./RegisterForm";
import UserProfile from "./UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <div className="router">
      <Router>
        <ItemsList />
        <Routes>
          <Route path={`/:id`} element={<RocketForm />}></Route>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
