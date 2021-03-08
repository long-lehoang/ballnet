import { createSlice } from "@reduxjs/toolkit";

const avatar = createSlice({
    name: 'avatar',
    initialState : '/avatar.png',
    reducers:{
        setAvatar(state, action){
            return action.payload;
        }
    }
});

const {actions, reducer} = avatar;
export const { setAvatar } = actions;
export default reducer;