import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ImgList: [],
  Image: [],
};

export const upload = createSlice({
  name: "upload",
  initialState,
  reducers: {
    ADD_IMG: (state, action) => {
      state.Image.push(action.payload); //이미지 데이터를 받아서  state.Image넣어준다
      state.ImgList = [...new Set(state.Image)]; // 같은 이미지가 들어가지 못하게 set을 사용하여 state.ImgList에  state.Image를 넣어준다
    },
    DELETE_IMG: (state, action) => {
      state.ImgList = action.payload;
      state.Image = action.payload;
    },
    INITIAL_STATE_IMG: () => {
      return initialState;
    },
  },
});

export const { ADD_IMG, DELETE_IMG, INITIAL_STATE_IMG } = upload.actions;
export default upload.reducer;
