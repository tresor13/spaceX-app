import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import rocketDataFormatter from "../utils/rocketDataFormatter";

/*This state was made using the EntityAdapter and looks like this. 
{ids: [], entities: {}}
This makes it easier to structure the state and write actions. We can call entities for Dragon information object 
by the key which is it's id.

In essence, actions are methods of the entityAdapter which are the CRUD Functions
for more details visit https://redux-toolkit.js.org/api/createEntityAdapter#getinitialstate */

const rocketsAdapter = createEntityAdapter();
const initialState = rocketsAdapter.getInitialState();

const rocketsSlice = createSlice({
  name: "rockets",
  initialState,
  reducers: {
    addRockets(state, { payload }) {
      /*
      rocketDataFormatter is a function which takes an array of objects as an argument (API Dragons) 
      and returns an array of objects with natively understandable keys, skipping unnecessary information. */
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
