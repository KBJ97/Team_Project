import { nowDate, nowValue, randomId } from "./common";

const userList = [
  {
    uid: "uid",
    email: "email",
    name: "nick name",
    phone: "phone number",
    profile: "업로드한 이미지 src",
    following: ["uid"],
    follower: ["uid"],
    myPosting: ["pid"],
    likedPosting: ["pid"],
    markedPosting: ["pid"],
    myComments: ["cid"],
    notice: ["알림"],
    signUpDate: nowDate,
    timestamp: nowValue,
    recentSearchs: [],
  },
];
// uid(String): firebase token을 이용하여 uid 생성
// email(String): 회원 가입 시 등록한 이메일(구글 로그인 시 구글 이메일)
// name(String): 유저가 설정한 닉네임 (디폴트 값 : 유저 이메일)
// phone(String): 회원 가입 시 등록한 휴대폰 번호
// profile(String): 유저가 업로드한 프로필 이미지의 src(이미지는 스토리지 별도 저장 예정)
// following(Array/String): 유저가 팔로우한 계정의 uid
// follower(Array/String): 해당 유저를 팔로우한 계정의 uid
// myPosting(Array/String): 유저가 작성한 게시글의 pid
// likedPosting(Array/String): 유저가 '좋아요' 한 게시글의 pid
// markedPosting(Array/String): 유저가 마크한 게시글의 pid
// myComments(Array/String): 유저가 작성한 코멘트의 cid
// notice(Array/String): 팔로우, 언팔로우, 본인 게시물에 댓글작성 등의 알림 리스트
// signUpDate(String): 회원가입일
// timeStamp(number) : 회원가입일 value
// recentSearch(Array/String) : 최근 검색어
// 데이터베이스에서 관리

const userInfo = {};
// 현재 로그인한 유저 정보(Object)
//

const postingList = [
  {
    pid: randomId,
    writer: "uid",
    comments: ["cid"],
    writeDate: nowDate,
    timestamp: nowValue,
    contents: {
      images: ["업로드한 이미지 src"],
      text: "작성자가 입력한 텍스트",
      hashtags: ["해쉬태그"],
    },
    like: ["uid"],
  },
];
// pid(String): 해당 게시글의 id
// writer(String): 해당 게시글 작성자의 uid
// comments(Array/String): 해당 게시글에 작성된 코멘트의 cid
// date(String): 게시글 작성 일자
// timestamp(number)
// contents(Object): {
//   images(Array/String): 게시글 작성 시 업로드한 이미지 리스트
//   text(String): 게시글 작성 시 입력한 텍스트
//   hashtags(Array/String): 게시글 작성 시 입력한 해쉬태그 리스트,
// },
// like(Array/String): 해당 게시글에 좋아요한 유저의 uid 리스트
//데이터베이스에서 관리

const commentList = [
  {
    cid: randomId,
    writer: "uid",
    posting: "pid",
    commentDate: nowDate,
    timestamp: nowValue,
    text: "작성자가 입력한 텍스트",
  },
];
// cid(String): 해당 코멘트의 id
// writer(String): 해당 코멘트를 작성한 유저의 uid
// posting(String): 해당 코멘트를 작성한 포스팅의 pid
// timestamp(String): 해당 코멘트의 작성 일자
// text(String): 코멘트 작성 시 입력한 테스트
const modalList = [
  {
    isWriteModalShown: false,
    // 리서치 모달
  },
];
// isWriteModalShown(boolean): 게시글 작성 모달 on/off 여부,
const login = [
  {
    isLoggedIn: false,
    currentUser: "uid",
  },
];
// isLoggedIn(boolean): 로그인 여부(currentUser의 존재 여부에 따라 로그인/로그아웃 상태 결정, 최상단에서 관리 필요(새로고침할 때마다 로그인 체크))
// currentUser(String): 로그인한 유저의 uid(localstorage)
