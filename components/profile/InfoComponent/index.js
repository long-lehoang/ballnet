import { faCamera, faDirections } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, FOLLOWS_API, FRIENDS_API, HOST, PROFILE_API, SPORT_API } from '../../../config/config';
import styles from './styles.module.scss';
import { setProfile } from '../../../slices/profileSlice';

export default function InfoComponent(props){
    const [avatar, setAvatar] = useState(AVATAR);
    const [follow, setFollow] = useState(0);
    const [friend, setFriend] = useState(0);
    const [location, setLocation] = useState("");
    const [match, setMatch] = useState(0);
    const [sport, setSport] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        const username = router.query.user;
        if(username!==undefined){

            axios.get(FRIENDS_API+username+'/count',{
                headers:{
                    'Authorization': token
                }
            }).then((response)=>{
                setFriend(response.data.data)
            }).catch((error)=>{
                console.log(error.response)
            });
    
            axios.get(FOLLOWS_API+username+'/count',{
                headers:{
                    'Authorization': token
                }
            }).then((response)=>{
                setFollow(response.data.data)
            }).catch((error)=>{
                console.log(error.response)
            })
    
            axios.get(SPORT_API+username+'/main',{
                headers:{
                    'Authorization': token
                }
            }).then((response)=>{
                setMatch(response.data.data.num_match||0);
                setSport(response.data.data.sport||"");
            }).catch((error)=>{
                console.log(error.response)
            })
        }
    },[router])

    useEffect(()=>{
        if(props.profile !== undefined){
            setLocation(props.profile.address||'')
            setPhone(props.profile.phone||'')
            setAvatar(props.profile.avatar !== null ? (HOST + props.profile.avatar) : AVATAR)
        }
    },[props.profile])
    function handleAvatar(event){
        const token = localStorage.getItem('access_token');
        var formData = new FormData();
        formData.append('image',event.target.files[0]);

        axios.post(PROFILE_API+'avatar',formData,{
            headers:{
                'Authorization': token
            }
        }).then((response)=>{
            let url = URL.createObjectURL(event.target.files[0]);
            setAvatar(url);
            dispatch(setProfile(response.data.data));
        }).catch((error)=>{
            console.log(error);
        });
    }

    return(
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src={avatar} key={avatar}></img>
                {props.permission ? <label for="button-avatar"><FontAwesomeIcon height={20} icon={faCamera}></FontAwesomeIcon></label> : ''}
                {props.permission ? <input id="button-avatar" type="file" onChange={handleAvatar}></input> : ''}
            </div>
            <div className={styles.friend_follow}>
                <div>
                    <span className={styles.label}>Followers</span>
                    <span className={styles.number}>{follow}</span>
                </div>
                <div>
                    <span className={styles.label}>Friends</span>
                    <span className={styles.number}>{friend}</span>
                </div>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Location: {location}</span>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Match: {match}</span>
            
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Main Sport: {sport}</span>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Phone: {phone}</span>
            </div>
        </div>
    )
}