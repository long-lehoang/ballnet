import axios from 'axios';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { AVATAR, HOST, STADIUM_API } from '../../../config/config';
import Loading from '../../commons/Loading';
import Item from '../../commons/Stadium';
import styles from './styles.module.scss'
import CreateStadiumForm from '../../commons/CreateStadiumForm';
import { FormattedMessage } from "react-intl";

export default function Stadium({user_id})
{
    const user = useSelector(state=>state.infoUser);
    const [list, setList] = useState([]);
    const token = useSelector(state=>state.token);
    const [show, setShow] = useState(false);
    const profile = useSelector(state => state.profile);
    useEffect(()=>{
        axios.get(STADIUM_API + `owner/${user_id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setList(response.data.data);
        }).catch(error=>{
            console.log(error)
        })
    }, [null]);

    return(
        <div className={styles.container}>
            {user.id === user_id ? <div className={styles.row}>
                <div className={styles.groupAdd}>
                    <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
                    <button className={styles.btn} onClick={() => setShow(true)}><FormattedMessage id="Create Stadium" /></button>
                </div>
                <CreateStadiumForm show={show} setShow={setShow} stadiums={list} setStadiums={setList}></CreateStadiumForm>
            </div> : ''}
            <div className={styles.list}>
                {
                    list.map((item, key)=>{
                        return(
                            <LazyLoad key={item.id} height={200} placeholder={<Loading/>}>
                                <Item item={item} key={item.id}/>
                            </LazyLoad>
                        )
                    })
                }
            </div>
        </div>
    )
}