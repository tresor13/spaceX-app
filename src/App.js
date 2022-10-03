import "./App.css";
import AppRouter from "./components/AppRouter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { actions as rocketsActions } from "./slices/rocketsSlice.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.spacexdata.com/v4/dragons")
        .then((response) => dispatch(rocketsActions.addRockets(response.data)));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
