import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  services: [],
  choosedService: {},
};

export const getSpecificSalonServices = createAsyncThunk(
  "services/getSpecificSalonServices",
  async (salonID) => {
    try {
      const services = await axios.get(
        `http://localhost:4000/get-specific-salon-services/${salonID}`,
        { withCredentials: true }
      );

      return services.data;
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

export const setChoosedService = createAsyncThunk(
  "services/setChoosedService",
  async (details) => {
    try {
      const d = details;
      console.log(details, "details");
      return { choosedService: d };
    } catch {}
  }
);

export const salonServiceSlice = createSlice({
  name: "salonService",
  initialState,
  extraReducers: {
    [getSpecificSalonServices.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
    [registerService.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
    [setChoosedService.fulfilled]: (state, action) => {
      console.log(action.payload, "payload");
      return { ...state, ...action.payload };
    },
  },
});

export const salonServicesReducer = salonServiceSlice.reducer;
