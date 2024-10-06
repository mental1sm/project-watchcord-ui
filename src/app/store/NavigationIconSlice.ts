import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveNavigation } from '../_constants/enums';


const initialState = {
    activeIcon: ActiveNavigation.HOME
};

const navigationIconSlice = createSlice({
    name: 'icon',
    initialState,
    reducers: {
        setActiveIcon(state, action: PayloadAction<ActiveNavigation>) {
            state.activeIcon = action.payload;
        }
    }
})

export const { setActiveIcon } = navigationIconSlice.actions;

const iconReducer = navigationIconSlice.reducer;
export default iconReducer;