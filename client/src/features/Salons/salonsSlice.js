import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  salons: [],
};

//export const registerSalon = createAsyncThunk(
//  "user/registerSalon",
//  async (salonDetails) => {
//    const salon = await axios.post(
//      "http://localhost:4000/register-salon",
//      salonDetails
//    );
//    return salon.data;
//  }
//);
//

export const getAllSalonsDetails = createAsyncThunk(
  "salons/getAllSalonsDetails", //type name
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-all-salons-details"
      );

      return response;
    } catch (error) {
      throw error; //
    }
  }
);

export const getSpecificSalonDetails = createAsyncThunk(
  "salons/getSpecificSalonDetails",
  async (salonName) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/get-specific-salon-details/${salonName}`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getSalonsForChosedService = createAsyncThunk(
  "salons/getSalonsForChosedService",
  async (category) => {
    try {
      console.log(category, "Aaaaaaaaaaaaa");
      const response = await axios.get(
        `http://localhost:4000/get-salons-for-choosed-service/${category}`
      );
      return response;
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
      return { ...action.payload.data };
    },
    [getSpecificSalonDetails.fulfilled]: (state, action) => {
      return { ...action.payload.data };
    },
    [getSalonsForChosedService.fulfilled]: (state, action) => {
      return { ...action.payload.data };
    },
  },
});

export const salonsReducer = salonsSlice.reducer;
