import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { FRIENDS_API } from '../../../../config/config';
import Loading from '../../../commons/Loading';
import Filter from './Filter';
import Item from './Item';
import styles from './styles.module.scss';
export default function Member({username}){
    const [members, setMembers] = useState([]);
    const [membersC, setMemberC] = useState([]);
    const token = useSelector(state => state.token);
    // useEffect(()=>{
    //     axios.get(FRIENDS_API+username,{
    //         headers:{
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(response=>{
    //         let data = response.data.data;
    //         setFriend(data);
    //         setFriendC(data);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // },[null])

    return(
        <div className={styles.container}>
            <Filter members={membersC} setMember={setMembers} result={members}></Filter>
            <div className={styles.list}>
            {members.map((element,key) => {
                return(
                    <LazyLoad key={key} height={200} placeholder={<Loading/>}>                       
                        <Item key={key} member={element}></Item>
                    </LazyLoad>
                )
            })}
            </div>
        </div>
    )
}