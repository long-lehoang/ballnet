import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { FRIENDS_API } from '../../../config/config';
import Loading from '../../commons/Loading';
import Filter from './Filter';
import Item from './Item';
import styles from './styles.module.scss';
export default function Friend({username,permission}){
    const [friends, setFriend] = useState([]);

    const token = useSelector(state => state.token);
    useEffect(()=>{
        axios.get(FRIENDS_API+username,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            let data = response.data.data;
            console.log(response.data);
            setFriend(data);
        }).catch(error => {
            console.log(error);
        });
    },[null])

    return(
        <div className={styles.container}>
            <Filter></Filter>
            <div className={styles.list}>
            {friends.map((element,key) => {
                return(
                    <LazyLoad key={key} height={200} placeholder={<Loading/>}>                       
                        <Item key={key} friend={element}></Item>
                    </LazyLoad>
                )
            })}
            </div>
        </div>
    )
}