import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  postingList: [
    {
      pid: "p1",
      writer: "u1",
      comments: ["c1", "c2"],
      timestamp: new Date().toLocaleDateString(),
      contents: {
        images: ["images/sample_profile.jpg"],
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur itaque ipsam officiis veniam autem laborum impedit porro illum dicta, sed id ipsum beatae tenetur debitis suscipit provident exercitationem eius. Dolore? Quisquam provident minima velit voluptatum aut omnis numquam possimus explicabo? Quas nemo esse recusandae et earum voluptas.Sit neque cumque aspernatur placeat voluptates iusto, necessitatibus nulla fuga repellendus nostrum corrupti.",
        hashtags: ["부산", "여행"],
      },
      like: [],
    },
    {
      pid: "p2",
      writer: "u1",
      comments: [],
      timestamp: new Date().toLocaleDateString(),
      contents: {
        images: ["images/sample_profile.jpg"],
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur itaque ipsam officiis veniam autem laborum impedit porro illum dicta, sed id ipsum beatae tenetur debitis suscipit provident exercitationem eius. Dolore? Quisquam provident minima velit voluptatum aut omnis numquam possimus explicabo? Quas nemo esse recusandae et earum voluptas.Sit neque cumque aspernatur placeat voluptates iusto, necessitatibus nulla fuga repellendus nostrum corrupti.",
        hashtags: ["서울", "맛집"],
      },
      like: ["u1"],
    },
  ],
};

export const posting = createSlice({
  name: "posting",
  initialState,
  reducers: {
    POSTING_LIKE_POSTING: (state, action) => {
      const { pid, uid } = action.payload;
      const existingPosting = state.postingList.find((posting) => {
        return posting.pid === pid;
      });
      if (existingPosting.like.includes(uid)) {
        const temp = existingPosting.like.filter((like) => {
          return like !== uid;
        });
        existingPosting.like = temp;
      } else {
        existingPosting.like.push(uid);
      }
    },
    //좋아요 / 좋아요 취소 기능
    //좋아요 아이콘 클릭 시 해당 포스팅에 '좋아요' 한 유저 추가/삭제
    POSTING_ADD_COMMENT: (state, action) => {
      const { pid, cid } = action.payload;
      const existingPosting = state.postingList.find((posting) => {
        return posting.pid === pid;
      });
      existingPosting.comments.push(cid);
    },
    ADD_POSTING: (state, action) => {
      state.postingList.push(action.payload);
      //initialState 안에 postingList안에 push매소드 사용해서 외부에서 데이터를 받아와(action.payload) 넣어준다
    },
  },
});

export const {
  POSTING_LIKE_POSTING,
  POSTING_ADD_COMMENT,
  ADD_POSTING,
  TEST_POSTING,
} = posting.actions;
export default posting.reducer;
