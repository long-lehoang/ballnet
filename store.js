import { configureStore } from "@reduxjs/toolkit"
import showCreateForm from "./components/commons/CreatePostForm/showCreateFormSlice";
import loginError from "./components/login/loginErrorSlice";
import infoUSer from "./components/login/infoUserSlice";
import profile from "./components/profile/profileSlice";
import avatar from "./components/profile/avatarSlice";

const store = configureStore({ 
    reducer: {
        showCreateForm: showCreateForm,
        loginError: loginError,
        infoUser: infoUSer,
        profile: profile,
        avatar: avatar,
    } 
})

export default store;