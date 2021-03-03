import { createSlice } from "@reduxjs/toolkit";

const loginError = createSlice({
    name: 'loginError',
    initialState : false,
    reducers:{
        setError(state, action){
            return action.payload;
        }
    }
});

const {actions, reducer} = loginError;
export const { setError } = actions;
export default reducer;