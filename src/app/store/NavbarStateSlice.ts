import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface NavbarStatus {
    status: boolean;
    hidden: boolean;
}

const initialState = {
    isOpened: false,
    visible: false
}

const navbarStateSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setNavbarState(state, action: PayloadAction<boolean>) {
            state.isOpened = action.payload;
        },
        setNavbarVisibility(state, action: PayloadAction<boolean>) {
            state.visible = action.payload;
        }
    }
})

export const {setNavbarState, setNavbarVisibility} = navbarStateSlice.actions;

const navbarStateReducer = navbarStateSlice.reducer;
export default navbarStateReducer;