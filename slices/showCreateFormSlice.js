import { createSlice } from "@reduxjs/toolkit";

const showCreateForm = createSlice({
    name: 'showCreateForm',
    initialState : false,
    reducers:{
        toggleForm(state, action){
            return action.payload;
        }
    }
});

const {actions, reducer} = showCreateForm;
export const { toggleForm } = actions;
export default reducer;