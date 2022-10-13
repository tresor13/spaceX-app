import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { actions as rocketsActions } from "../slices/rocketsSlice.js";

function useRequestDragons() {
  const url = useMemo(() => "https://api.spacexdata.com/v4/dragons", []);
  const dispatch = useDispatch();
  const fetchDragon = useCallback(
    async (id) => {
      await axios
        .get(`${url}/${id}`)
        .then((response) =>
          dispatch(rocketsActions.updateRocket(response.data))
        );
    },
    [url, dispatch]
  );

  const fetchDragons = useCallback(async () => {
    await axios.get(url).then((response) => {
      dispatch(rocketsActions.addRockets(response.data));
    });
  }, [url, dispatch]);

  return {
    fetchDragon,
    fetchDragons,
  };
}

export default useRequestDragons;
