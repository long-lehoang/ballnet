import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setUser} from '../components/login/infoUserSlice'


export default function checkLogin(){
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        const action = setUser(user)
        dispatch(action);
        if(user === null){
            router.replace('/login')
        }
    })
    
}
