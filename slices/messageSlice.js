import { createSlice } from "@reduxjs/toolkit";

const message = createSlice({
    name: 'message',
    initialState : {},
    reducers:{
        setMessage(state, action){
            return action.payload;
        }
    }
});

const {actions, reducer} = message;
export const { setMessage } = actions;
export default reducer;