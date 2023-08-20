import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  salons: [],
  currentSalon: {},
};

export const registerSalon = createAsyncThunk(
  "user/registerSalon",
  async (salonDetails) => {
    const salon = await axios.post(
      "http://localhost:4000/register-salon",
      salonDetails
    );
    return salon.data;
  }
);

export const getAllSalonsDetails = createAsyncThunk(
  "salons/getAllSalonsDetails", //type name
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-all-salons-details"
      );
      return response.data;
    } catch (error) {
      throw error; //
    }
  }
);

export const getSpecificSalonDetails_ID = createAsyncThunk(
  "salons/getSpecificSalonDetails_ID",
  async (userID) => {
    try {
      //changed to salonName from userID
      const response = await axios.get(
        `http://localhost:4000/get-specific-salon-details-ID/${userID}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getSpecificSalonDetails_SalonName = createAsyncThunk(
  "salons/getSpecificSalonDetails_SalonName",
  async (salonName) => {
    try {
      //changed to salonName from userID
      const response = await axios.get(
        `http://localhost:4000/get-specific-salon-details-salonName/${salonName}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getSalonsForChosedService = createAsyncThunk(
  "salons/getSalonsForChosedService",
  async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/get-salons-for-choosed-service/${category}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const salonsSlice = createSlice({
  name: "salons",
  initialState,
  extraReducers: {
    [getAllSalonsDetails.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getSpecificSalonDetails_ID.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getSalonsForChosedService.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getSpecificSalonDetails_SalonName.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const salonsReducer = salonsSlice.reducer;
