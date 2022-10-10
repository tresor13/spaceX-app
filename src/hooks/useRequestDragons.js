import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { actions as rocketsActions } from "../slices/rocketsSlice.js";

function useRequestDragons(url) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(url)
        .then((response) => dispatch(rocketsActions.addRockets(response.data)));
    };
    fetchData();
  }, [dispatch, url]);
}

export default useRequestDragons;
