import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentUserInfo: {},
  profile: [],
  profileImg: [],
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    GET_CURRENT_USER_INFO: (state, action) => {
      state.currentUserInfo = action.payload;
    },
    REMOVE_NOTICE: (state, action) => {
      const filteredNotice = state.currentUserInfo.notice.filter((notice) => {
        return notice.nid !== action.payload;
      });
      state.currentUserInfo.notice = filteredNotice;
    },

    GET_CURRENT_USER_PROFILE: (state, action) => {
      state.profile[0] = action.payload;
    },
    ADD_CURRENT_USER_PROFILE: (state, action) => {
      state.profileImg[0] = action.payload;
    },
    REMOVE_RECENT_SEARCH: (state, action) => { 
      const filteredRecentSearchs = state.currentUserInfo.recentSearchs.filter((item) => { 
        return item !== action.payload;
      })
      state.currentUserInfo.recentSearchs = filteredRecentSearchs;
    },
    ADD_RECENT_SEARCH: (state, action) => { 
      state.currentUserInfo.recentSearchs.push(action.payload)
    }
  },
});

export const {
  ADD_RECENT_SEARCH,
  REMOVE_RECENT_SEARCH,
  GET_CURRENT_USER_INFO,
  GET_CURRENT_USER_PROFILE,
  ADD_CURRENT_USER_PROFILE,
  REMOVE_NOTICE,
} = user.actions;
export default user.reducer;
