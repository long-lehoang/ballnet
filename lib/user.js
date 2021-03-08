import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setUser} from '../components/login/infoUserSlice'
import {PROFILE_API} from '../config/config';
import {setProfile} from '../components/profile/profileSlice';
import {setAvatar} from '../components/profile/avatarSlice';
import {IMAGE_API} from '../config/config';

export default function checkLogin(){
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        const actionUser = setUser(user)
        dispatch(actionUser);
        if(user === null){
            router.replace('/login')
        }else{
            const token = localStorage.getItem('access_token');
            axios.get(PROFILE_API+user.id,{
                headers:{
                    'Authorization': token
                }
            }).then((response)=>{
                const profile = response.data.data
                const actionProfile = setProfile(profile);
                dispatch(actionProfile);

                if(profile == null || (Object.keys(profile).length === 0 && profile.constructor === Object) || profile.avatar == null)
                {
                    console.log("null avatar");
                }
                else{
                    axios.get(IMAGE_API+profile.avatar,{
                        headers:{
                            'Authorization': localStorage.getItem('access_token')
                        }
                    }).then((response)=>{
                        const avatar = response.data;

                        const actionAvatar = setAvatar(avatar);
                        
                        dispatch(actionAvatar);
                    })
                }
            })
        }
    })
    
}
