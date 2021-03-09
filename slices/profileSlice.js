import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
    name: 'profile',
    initialState : {},
    reducers:{
        setProfile(state, action){
            return action.payload;
        }
    }
});

const {actions, reducer} = profile;
export const { setProfile } = actions;
export default reducer;