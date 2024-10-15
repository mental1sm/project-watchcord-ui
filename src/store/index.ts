import { configureStore } from "@reduxjs/toolkit";
import navbarStateReducer from "./NavbarStateSlice";
import accumulatedScrollStateReducer from "./AccumulatedScrolStateSlice";
import settingsStateReducer from './SettingsStateSlice';


const store = configureStore({
    reducer: {
        navbar: navbarStateReducer,
        accumulated: accumulatedScrollStateReducer,
        settings: settingsStateReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;