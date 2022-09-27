import React from "react";
import RocketForm from "./RocketForm";
import HomePage from "./HomePage";
import ItemsList from "./ItemsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <div className="router">
      <Router>
        <ItemsList />
        <Routes>
          <Route path={`/:id`} element={<RocketForm />}></Route>
          <Route path="/" exact element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
