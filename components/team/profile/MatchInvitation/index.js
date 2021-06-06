import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import { MATCH_API, TEAM_API } from "../../../../config/config";
import Loading from "../../../commons/Loading";
import Item from "../../../commons/MatchInvitationItem";
import styles from './styles.module.scss';

export default function MatchInvitation({team}){
    const token = useSelector(state=>state.token);
    const [list, setList] = useState([]);

    useEffect(()=>{
        axios.get(TEAM_API+`${team.id}/matchs/invitation`, {
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
            <div className={styles.list}>
                {list.map((element,key)=>{
                    return(
                        <LazyLoad key={key} height={200} placeholder={<Loading/>}>
                            <Item item={element} team={team} key={key}></Item>
                        </LazyLoad>
                    )
                })}
            </div>
        </div>
    )
}