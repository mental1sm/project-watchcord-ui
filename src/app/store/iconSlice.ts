import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveNavigation } from '../_constants/enums';

interface IconState {
    activeIcon: ActiveNavigation;
  }

const initialState = {
    activeIcon: ActiveNavigation.HOME
};

const iconSlice = createSlice({
    name: 'icon',
    initialState,
    reducers: {
        setActiveIcon(state, action: PayloadAction<ActiveNavigation>) {
            state.activeIcon = action.payload;
        }
    }
})

export const { setActiveIcon } = iconSlice.actions;

const iconReducer = iconSlice.reducer;
export default iconReducer;