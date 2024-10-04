import { configureStore } from "@reduxjs/toolkit";
import iconReducer from "./NavigationIconSlice";
import navbarStateReducer from "@/app/store/NavbarStateSlice";


const store = configureStore({
    reducer: {
        icon: iconReducer,
        navbar: navbarStateReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;