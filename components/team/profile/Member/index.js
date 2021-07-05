import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { TEAM_API } from '../../../../config/config';
import Loading from '../../../commons/Loading';
import Filter from './Filter';
import InviteForm from './InviteForm';
import Item from './Item';
import styles from './styles.module.scss';
export default function Member({team}){
    const [members, setMembers] = useState([]);
    const [membersC, setMemberC] = useState([]);
    const token = useSelector(state => state.token);

    useEffect(()=>{
        axios.get(TEAM_API+`${team.id}/member`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            let data = response.data.data;
            setMembers(data);
            setMemberC(data);
        }).catch(error => {
            console.log(error);
        });
    },[null]);

    return(
        <div className={styles.container}>
            <InviteForm team={team}></InviteForm>
            <div className={styles.list}>
            <Filter members={membersC} setMember={setMembers} result={members}></Filter>
            {members.map((element,key) => {
                return(
                    <LazyLoad key={key} height={200} placeholder={<Loading/>}>                       
                        <Item key={key} member={element} team={team}></Item>
                    </LazyLoad>
                )
            })}
            </div>

        </div>
    )
}