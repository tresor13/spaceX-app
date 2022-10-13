import "./App.css";
import AppRouter from "./components/AppRouter";
import useRequestDragons from "./hooks/useRequestDragons";
import { useEffect } from "react";

function App() {
  const { fetchDragons } = useRequestDragons();

  useEffect(() => {
    fetchDragons();
  }, [fetchDragons]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
