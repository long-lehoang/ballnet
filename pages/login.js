import { useRouter } from "next/router";
import { useEffect } from "react";
import LayoutLogin from "../components/layout/login";
import LoginForm from "../components/login";

export default function Login(){
    const router = useRouter()
    useEffect(()=>{
        if(localStorage.getItem('user') !== null)
            router.replace('/');
    })
    return (
        <LayoutLogin>
            <LoginForm />
        </LayoutLogin>
    );
}