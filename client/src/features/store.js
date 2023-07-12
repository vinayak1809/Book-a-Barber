import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { userOptionReducer } from "./user/optionSlice";
import { salonsReducer } from "./Salons/salonsSlice";
import { salonServicesReducer } from "./services/servicesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userOption: userOptionReducer,
    salons: salonsReducer,
    services: salonServicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
