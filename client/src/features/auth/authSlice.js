import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: "auth",
  initialState : {
    user : null,
    loading : false,
    error : null
  },
  reducers: {
    setUser : (state, action) => {
      state.user = action.payload,
      state.error = null
    },
    logOutUser : (state) => {
      state.user = null,
      localStorage.removeItem("token")
    },
    setLoading : (state, action) => {
      state.loading = action.payload
    },
    setError : (state, action) => {
      state.error = action.payload
    }
  }
})

export const {setUser, logoutUser, setLoading, setError} = authSlice.actions;
export default authSlice.reducer