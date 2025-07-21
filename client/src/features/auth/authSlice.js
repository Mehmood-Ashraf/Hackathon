import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { openOtpModal } from "../otpModal/otpModalSlice";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if(res.data.message === "Email sent to user"){
        dispatch(openOtpModal())
      }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "signup Failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true
    }).addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

    //login
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true
    }).addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })


    //logout
    .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
    })
  },
});


export default authSlice.reducer