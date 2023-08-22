import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { userReducer } from "./user/userSlice";
import { userOptionReducer } from "./user/optionSlice";
import { salonsReducer } from "./Salons/salonsSlice";
import { salonServicesReducer } from "./services/servicesSlice";

const persistConfig = {
  key: "root",
  version: 2,
  storage,
  migrate: (state) => {
    return Promise.resolve(state);
  },
};

const rootReducer = combineReducers({
  user: userReducer,
  userOption: userOptionReducer,
  salons: salonsReducer,
  services: salonServicesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
