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
  async (action) => {
    try {
      const { service, tagname } = action;
      const newService = { ...service };

      var filter = newService.types.filter(checkTag);

      function checkTag(a) {
        return tagname === a.name;
      }

      newService.types = filter;
      return { choosedService: newService };
    } catch {}
  }
);

export const getServicesForChossedCategory = createAsyncThunk(
  "salons/getServicesForChossedCategory",
  async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/get-services-for-choosed-category/${category}`
      );
      return response.data;
    } catch (error) {
      throw error;
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
      return { ...action.payload };
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
