import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import rocketDataFormatter from "../utils/rocketDataFormatter";

const rocketsAdapter = createEntityAdapter();
const initialState = rocketsAdapter.getInitialState();

const rocketsSlice = createSlice({
  name: "rockets",
  initialState,
  reducers: {
    addRockets(state, { payload }) {
      const formattedData = rocketDataFormatter(payload);
      rocketsAdapter.addMany(state, formattedData);
    },
    updateRocket(state, { payload }) {
      const formattedData = rocketDataFormatter([payload]);
      rocketsAdapter.updateOne(state, formattedData);
    },
  },
});
export const selectors = rocketsAdapter.getSelectors((state) => state.rockets);
export const { actions } = rocketsSlice;
export default rocketsSlice.reducer;
