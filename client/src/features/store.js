import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { userOptionReducer } from "./user/optionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userOption: userOptionReducer,
  },
});

export default store;
