import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import otpModalReducer from '../features/otpModal/otpModalSlice'


export const store = configureStore({
    reducer : {
        auth : authReducer,
        modal : otpModalReducer
    }
})