import LayoutLogin from "../components/layout/login";
import SignupForm from "../components/signup";
import {SIGNUP_API} from "../config/config";
import axios from 'axios';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setMessage } from "../slices/messageSlice";
import { setLoading } from "../slices/loadingSlice";

export default function Signup(){
    const router = useRouter();
    const dispatch = useDispatch();

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    const handleSubmit = (values) => {
        dispatch(setLoading(true));
        axios.post(SIGNUP_API,values)
        .then((response) => { 
            // Code for handling the response 
            // save token
            dispatch(setLoading(false));
            router.push('/login');
        })
        .catch((error) => { 
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx   
                dispatch(setLoading(false));
                openMessageBox('Failed to signup. Please signup again');
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                dispatch(setLoading(false));
                openMessageBox('No response');
            } else {
                // Something happened in setting up the request that triggered an Error
                dispatch(setLoading(false));
                openMessageBox('Something happened in setting up the request that triggered an Error');
            }
        })
    }
    const initialValues={
        name: '',
        username: '',
        password: '',
        email:'',
        c_password: ''
    }
    return (
        <LayoutLogin>
            <SignupForm 
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </LayoutLogin>
    );
}