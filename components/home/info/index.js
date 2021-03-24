
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR, FOLLOWS_API, FRIENDS_API, HOST } from '../../../config/config';
import styles from './styles.module.scss';
import loadStar from '../../../lib/star';

export default function InfoHome(){
    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);
    let link_profile = user != null ? user.username : "";
    const [followers, setFollowers] = useState(0);
    const [friends, setFriends] = useState(0);
    
    useEffect(()=>{
        const token = localStorage.getItem("access_token");
        axios.get(FRIENDS_API+user.id+'/count',{
            headers:{
                "Authorization": token
            }
        }).then((response)=>{
            setFriends(response.data.data);
        }).catch((error)=>{
            console.log(error.response.data.message);
        });
        axios.get(FOLLOWS_API+user.id+'/count',{
            headers:{
                "Authorization": token
            }
        }).then((response)=>{
            setFollowers(response.data.data);
        }).catch((error)=>{
            console.log(error.response.data.message);
        });
    },[null])
    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar}></img>
            </div>
            <div className={styles.row}>
                <span className={styles.name}>{user == null ? 'No Name' : user.name}</span>
            </div>
            <div className={styles.row}>
                <div className={styles.star}>
                {loadStar(profile == null ? 0 : profile.points)}
                </div>
            </div>
            <div className={styles.row}>
                <span className={styles.followers}>Followers: {followers}</span>
            </div>
            <div className={styles.row}>
                <span className={styles.friends}>Friends: {friends}</span>
            </div>
            <div className={styles.row}>
                <Link href={"/" + link_profile}>
                    <span className={styles.link}>View Profile</span>
                </Link>
            </div>
        </div>
    );
}