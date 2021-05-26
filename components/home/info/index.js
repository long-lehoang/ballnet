
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR, FOLLOWS_API, FRIENDS_API, HOST } from '../../../config/config';
import styles from './styles.module.scss';
import loadStar from '../../../lib/star';
import { FormattedMessage } from 'react-intl';

export default function InfoHome(){
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);
    let link_profile = user != null ? user.username : "";
    const [followers, setFollowers] = useState(0);
    const [friends, setFriends] = useState(0);
    
    useEffect(()=>{
        if(user.username !== undefined){

            axios.get(FRIENDS_API+user.username+'/count',{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }).then((response)=>{
                setFriends(response.data.data);
            }).catch((error)=>{
                console.log(error);
            });
            axios.get(FOLLOWS_API+user.username+'/count',{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }).then((response)=>{
                setFollowers(response.data.data);
            }).catch((error)=>{
                console.log(error);
            });
        }
    },[user])
    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <Link href={"/" + link_profile}>
                <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar}></img>
                </Link>
            </div>
            <div className={styles.row}>
                <span className={styles.name}>{user.name}</span>
            </div>
            <div className={styles.row}>
                <div className={styles.star}>
                {loadStar(profile == null ? 0 : profile.points)}
                </div>
            </div>
            <div className={styles.row}>
                <span className={styles.followers}><FormattedMessage id="Followers" />: {followers}</span>
            </div>
            <div className={styles.row}>
                <span className={styles.friends}><FormattedMessage id="Friends" />: {friends}</span>
            </div>
        </div>
    );
}