import { createSlice } from "@reduxjs/toolkit";


const otpModalSlice = createSlice({
    name : "modal",
    initialState : { otpModalopen : false },
    reducers : {
        openOtpModal: (state) => {
            state.otpModalopen = true
        },
        closeOtpModal: (state) => {
            state.otpModalopen = false
        }
    }
})


export const {openOtpModal, closeOtpModal} = otpModalSlice.actions;
export default otpModalSlice.reducer