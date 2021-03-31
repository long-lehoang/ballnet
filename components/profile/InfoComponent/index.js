import { faDirections } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AVATAR, FOLLOWS_API, FRIENDS_API, HOST, SPORT_API } from '../../../config/config';
import styles from './styles.module.scss';

export default function InfoComponent(props){
    const [avatar, setAvatar] = useState(AVATAR);
    const [follow, setFollow] = useState(0);
    const [friend, setFriend] = useState(0);
    const [location, setLocation] = useState("");
    const [match, setMatch] = useState(0);
    const [sport, setSport] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        const username = router.query.user;

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

        if(props.profile !== undefined){
            setLocation(props.profile.address||'')
            setPhone(props.profile.phone||'')
            setAvatar(props.profile.avatar !== null ? (HOST + props.profile.avatar) : AVATAR)
        }
        
    })
    return(
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src={avatar} ></img>
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