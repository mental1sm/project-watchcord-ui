import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Langs = 'ru' | 'en';

export type AppSettings = {
    lang: Langs;
}

const initialState: AppSettings = {
    lang: 'en'
}

const settingsStateSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettingsState(state, action: PayloadAction<AppSettings>) {
            state = action.payload;
        },
        setLanguageState(state, action: PayloadAction<Langs>) {
            state.lang = action.payload;
        }
    }
})

export const {setSettingsState, setLanguageState} = settingsStateSlice.actions;

const settingsStateReducer = settingsStateSlice.reducer;
export default settingsStateReducer;