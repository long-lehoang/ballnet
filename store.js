import { configureStore } from "@reduxjs/toolkit"
import showCreateForm from "./components/commons/CreatePostForm/showCreateFormSlice";
import loginError from "./components/login/loginErrorSlice";

const store = configureStore({ 
    reducer: {
        showCreateForm: showCreateForm,
        loginError: loginError
    } 
})

export default store;