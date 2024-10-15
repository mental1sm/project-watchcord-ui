import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    accumulated: 0
}

const accumulatedScrollStateSlice = createSlice({
    name: 'accumulated',
    initialState,
    reducers: {
        addAccumulatedScroll(state, action: PayloadAction<number>) {
            state.accumulated += action.payload;
        },
        resetAccumulatedScroll(state, action: PayloadAction<number>) {
            state.accumulated = 0;
        }
    }
})

export const {addAccumulatedScroll, resetAccumulatedScroll} = accumulatedScrollStateSlice.actions;

const accumulatedScrollStateReducer = accumulatedScrollStateSlice.reducer;
export default accumulatedScrollStateReducer;