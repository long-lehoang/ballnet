import LayoutLogin from "../components/layout/login";
import SignupForm from "../components/signup";
import {SIGNUP_API} from "../constants/config";
import axios from 'axios';
import { useRouter } from "next/router";

export default function Signup(){
    const router = useRouter();

    const handleSubmit = (values) => {
        console.log('Form submit: ', SIGNUP_API);

        axios.post(SIGNUP_API,values)
        .then((response) => { 
            // Code for handling the response 
            // save token
            console.log(response.message);
            router.push('/login');
        })
        .catch((error) => { 
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx

                console.log(error.response.data)
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log(error.message)
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