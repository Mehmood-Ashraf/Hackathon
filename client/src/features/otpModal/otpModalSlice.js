import { createSlice } from "@reduxjs/toolkit";


const otpModalSlice = createSlice({
    name : "modal",
    initialState : { otpModalOpen : false },
    reducers : {
        openOtpModal: (state) => {
            state.otpModalOpen = true
        },
        closeOtpModal: (state) => {
            state.otpModalOpen = false
        }
    }
})


export const {openOtpModal, closeOtpModal} = otpModalSlice.actions;
export default otpModalSlice.reducer