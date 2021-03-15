import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setUser} from '../slices/infoUserSlice'
import {PROFILE_API} from '../config/config';
import {setProfile} from '../slices/profileSlice';
import {setToken} from '../slices/tokenSlice';

export default function checkLogin(){
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('access_token');

        axios.defaults.headers.common['Authorization'] = token;

        const actionToken = setToken(token);
        dispatch(actionToken);
        const actionUser = setUser(user);
        dispatch(actionUser);
        if(user === null){
            router.replace('/login');
        }else{
            axios.get(PROFILE_API+user.id,{
                headers:{
                    'Authorization': token
                }
            }).then((response)=>{
                const profile = response.data.data;
                const actionProfile = setProfile(profile);
                dispatch(actionProfile);
            })
        }
    })
    
}
