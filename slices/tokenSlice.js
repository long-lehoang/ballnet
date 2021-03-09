import { createSlice } from "@reduxjs/toolkit";

const token = createSlice({
    name: 'token',
    initialState : '',
    reducers:{
        setToken(state, action){
            return action.payload;
        }
    }
});

const {actions, reducer} = token;
export const { setToken } = actions;
export default reducer;