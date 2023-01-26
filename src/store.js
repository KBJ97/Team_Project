import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./modules/user";
import ModalReducer from "./modules/modal";
import HashReducer from "./modules/hash";
import UpLoadReducer from "./modules/upload";
import SearchReducer from "./modules/search";
import LoginReducer from "./modules/login";
import PendingReducer from './modules/pending'
import PlanReducer from './modules/plan'

export default configureStore({
  reducer: {
    user: UserReducer,
    modal: ModalReducer,
    hash: HashReducer,
    upload: UpLoadReducer,
    search: SearchReducer,
    login: LoginReducer,
    pending: PendingReducer,
    plan : PlanReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
