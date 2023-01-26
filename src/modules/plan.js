import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  markedPlaces: [],
};

const plan = createSlice({
  name: "plan",
  initialState,
  reducers: {
    ADD_MARKED_PLACE: (state, action) => {
      state.markedPlaces.push(action.payload);
    },
    REMOVE_MARKED_PLACE: (state, action) => {
      const filteredPlaces = state.markedPlaces
        .filter((place) => {
          return place.id !== action.payload;
        })
        .map((place, idx) => {
          return { ...place, id: idx + 1 };
        });
      state.markedPlaces = filteredPlaces;
    },
  },
});

export const { ADD_MARKED_PLACE, REMOVE_MARKED_PLACE } = plan.actions;
export default plan.reducer;
