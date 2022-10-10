import "./App.css";
import AppRouter from "./components/AppRouter";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import axios from "axios";
// import { actions as rocketsActions } from "./slices/rocketsSlice.js";
import useRequestDragons from "./hooks/useRequestDragons";
function App() {
  useRequestDragons("https://api.spacexdata.com/v4/dragons");

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
