import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  services: [],
};

export const getSpecificSalonServices = createAsyncThunk(
  "services/getSpecificSalonServices",
  async (salonID) => {
    try {
      const services = await axios.get(
        `http://localhost:4000/get-specific-salon-services/${salonID}`
      );

      return services;
    } catch (error) {
      throw error; //
    }
  }
);

export const salonServiceSlice = createSlice({
  name: "salonService",
  initialState,
  extraReducers: {
    [getSpecificSalonServices.fulfilled]: (state, action) => {
      return { ...action.payload.data };
    },
  },
});

export const salonServicesReducer = salonServiceSlice.reducer;
