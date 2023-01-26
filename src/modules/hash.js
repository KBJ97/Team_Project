import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  HashList: [],
};

export const hashtag = createSlice({
  name: "hashtag",
  initialState,
  reducers: {
    ADD_TAG: (state, action) => {
      state.HashList.push(action.payload);
      //initialState 안에 HashList안에 push매소드 사용해서 외부에서 데이터를 받아와(action.payload) 넣어준다
    },
    DELETE_TAG: (state, action) => {
      //해쉬태그 삭제 함수
      state.HashList = action.payload;
    },
    INITIAL_STATE_HASH: () => {
      return initialState;
    },
  },
});

export const { ADD_TAG, DELETE_TAG, INITIAL_STATE_HASH } = hashtag.actions;
export default hashtag.reducer;
