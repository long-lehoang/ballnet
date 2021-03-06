import { createSlice } from "@reduxjs/toolkit";

const infoUser = createSlice({
    name: 'infoUser',
    initialState : {},
    reducers:{
        setUser(state, action){
            return action.payload;
        }
    }
});

const {actions, reducer} = infoUser;
export const { setUser } = actions;
export default reducer;