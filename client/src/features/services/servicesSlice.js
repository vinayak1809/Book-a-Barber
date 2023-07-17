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

export const registerService = createAsyncThunk(
  "servics/registerService",
  async (serviceDetails) => {
    try {
      const service = await axios.post(
        `http://localhost:4000/register-specific-salon-service`,
        serviceDetails
      );
      return service;
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
    [registerService.fulfilled]: (state, action) => {
      console.log(action.payload, "action.payload");
      return { ...action.payload };
    },
  },
});

export const salonServicesReducer = salonServiceSlice.reducer;
