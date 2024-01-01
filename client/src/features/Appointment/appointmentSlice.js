import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appointments: [],
};

export const registerAppointment = createAsyncThunk(
  "user/registerAppointment",
  async (appointmentDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/register-appointment",
        appointmentDetails
      );

      return { ...response, error: "" };
    } catch (error) {
      return { error: "Unable to Register Appointment" };
    }
  }
);

//Normal User
export const getUserAppointments = createAsyncThunk(
  "user/getUserAppointments",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-user-appointments",
        {
          withCredentials: true,
        }
      );
      return { ...response.data, error: "" };
    } catch (error) {
      return { error: "something went wrong: " + error.name };
      //console.log(error, "error in fetching user order");
    }
  }
);

//User who is a Barber
export const getBarborAppointments = createAsyncThunk(
  "user/getBarberAppointments",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/get-barber-appointments/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return { error: "something went wrong" };
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
      return { ...response.data, error: "" };
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
    [getBarborAppointments.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [updateBarberAppointment.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getUserAppointments.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const appointmentReducer = appointmentSlice.reducer;
