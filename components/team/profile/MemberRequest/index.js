import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { TEAM_REQUEST_API } from '../../../../config/config';
import Loading from '../../../commons/Loading';
import Filter from './Filter';
import Item from './Item';
import styles from './styles.module.scss';
export default function MemberRequest({team}){
    const [requests, setRequest] = useState([]);
    const [requestC, setRequestC] = useState([]);
    const token = useSelector(state => state.token);

    useEffect(()=>{
        axios.get(TEAM_REQUEST_API+team.id,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            let data = response.data.data;
            setRequest(data);
            setRequestC(data);
        }).catch(error => {
            console.log(error);
        });
    },[null])

    return(
        <div className={styles.container}>
            <div className={styles.list}>
            <Filter requests={requestC} setRequest={setRequest} result={requests}></Filter>
            {requests.map((element,key) => {
                return(
                    <LazyLoad key={key} height={200} placeholder={<Loading/>}>                       
                        <Item key={key} request={element}></Item>
                    </LazyLoad>
                )
            })}
            </div>
        </div>
    )
}