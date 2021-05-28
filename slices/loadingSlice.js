import { createSlice } from "@reduxjs/toolkit";

const loading = createSlice({
    name: 'loading',
    initialState : {},
    reducers:{
        setLoading(state, action){
            return action.payload;
        }
    }
});

const {actions, reducer} = loading;
export const { setLoading } = actions;
export default reducer;