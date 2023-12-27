import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appointment: [
    {
      _id: "",
      userID: "",
      salonID: "",
      service: "",
      date: "",
      time: "",
      status: "",
    },
  ],
};

export const registerAppointment = createAsyncThunk(
  "user/registerAppointment",
  async (appointmentDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/register-appointment",
        appointmentDetails
      );

      return response;
    } catch (error) {
      throw error; //
    }
  }
);

export const updateBarberAppointment = createAsyncThunk(
  "user/updateBarberAppointment",
  async (info) => {
    try {
      const response = axios.put(
        `http://localhost:4000/update-barber-appointment/${info.id}`,
        { status: info.status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return { error: "something went wrong" };
    }
  }
);
export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  extraReducers: {
    [registerAppointment.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const appointmentReducer = appointmentSlice.reducer;
