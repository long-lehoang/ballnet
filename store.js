import { configureStore } from "@reduxjs/toolkit"
import showCreateForm from "./slices/showCreateFormSlice";
import loginError from "./slices/loginErrorSlice";
import infoUSer from "./slices/infoUserSlice";
import profile from "./slices/profileSlice";
import token from "./slices/tokenSlice";
import message from "./slices/messageSlice";

const store = configureStore({ 
    reducer: {
        showCreateForm: showCreateForm,
        loginError: loginError,
        infoUser: infoUSer,
        profile: profile,
        token: token,
        message: message,
    } 
})

export default store;