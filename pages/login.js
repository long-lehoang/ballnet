import LayoutLogin from "../components/layout/login";
import LoginForm from "../components/login";
import {LOGIN_API} from "../constants/config";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import {setError} from "../components/login/loginErrorSlice";
import {setUser} from "../components/login/infoUserSlice";

export default function Login(){
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        console.log('Form submit: ', LOGIN_API);

        axios.post(LOGIN_API,values)
        .then((response) => { 
            console.log(response);

            // Code for handling the response 
            // save token
            if(response.data.success){
                console.log(response.data.data.user);
                localStorage.setItem(
                    'access_token',
                    response.data.data.token_type +' '+ response.data.data.access_token
                );
                //set user info
                const actionUser = setUser(response.data.data.user);
                dispatch(actionUser);
                //set success
                const actionError = setError(false);
                dispatch(actionError);
                router.push('/');
                console.log(response.data.message);
            } else{
                const actionError = setError(true);
                dispatch(actionError);
                console.log(response.data.message);
            }
            
        })
        .catch((error) => { 
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const actionError = setError(true);
                dispatch(actionError);
                console.log(error.response.data)
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                const actionError = setError(true);
                dispatch(actionError);
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                const actionError = setError(true);
                dispatch(actionError);
                console.log(error.message)
            }
        })
    }
    const initialValues={
        username: '',
        password: '',
        remember: false
    }
    return (
        <LayoutLogin>
            <LoginForm 
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </LayoutLogin>
    );
}