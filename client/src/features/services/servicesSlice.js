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

      return { ...services.data, error: "" };
    } catch (error) {
      return { error: "Something went wrong" };
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
      return { ...service.data, error: "" };
    } catch (error) {
      return { error: "Unable to Register Service" };
    }
  }
);

export const setChoosedService = createAsyncThunk(
  "services/setChoosedService",
  async (action) => {
    try {
      const { service, tagname } = action;
      const newService = { ...service };

      var filter = newService.types.filter(checkTag);

      function checkTag(a) {
        return tagname === a.name;
      }

      newService.types = filter;

      return { choosedService: newService, error: "" };
    } catch {
      return { error: "Something went wrong" };
    }
  }
);

export const getServicesForChossedCategory = createAsyncThunk(
  "salons/getServicesForChossedCategory",
  async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/get-services-for-choosed-category/${category}`
      );
      return { ...response.data, error: "" };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  }
);

export const registerSalonSchedules = createAsyncThunk(
  "salons/registerSalonSchedules",
  async (schedule) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/register-salon-schedules",
        schedule,
        { withCredentials: true }
      );
      return { ...response.data, error: "" };
    } catch (error) {
      return { error: "Unable to register salon schedules" };
    }
  }
);

export const updateSalonSchedules = createAsyncThunk(
  "salons/updateSalonSchedules",
  async (schedule) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/update-salon-schedules",
        schedule,
        { withCredentials: true }
      );
      return { ...response.data, error: "" };
    } catch (error) {
      return { error: "Unable to update salon schedules" };
    }
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
      return { ...state, ...action.payload };
    },
    [setChoosedService.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getServicesForChossedCategory.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const salonServicesReducer = salonServiceSlice.reducer;
