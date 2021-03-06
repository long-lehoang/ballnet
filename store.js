import { configureStore } from "@reduxjs/toolkit"
import showCreateForm from "./components/commons/CreatePostForm/showCreateFormSlice";
import loginError from "./components/login/loginErrorSlice";
import infoUSer from "./components/login/infoUserSlice";

const store = configureStore({ 
    reducer: {
        showCreateForm: showCreateForm,
        loginError: loginError,
        infoUser: infoUSer,
    } 
})

export default store;