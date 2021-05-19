import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import { MATCH_API, TEAM_API } from "../../../../config/config";
import CreateMatchForm from "../../../commons/CreateMatchForm";
import Loading from "../../../commons/Loading";
import Item from "../../../commons/MatchItem";
import styles from './styles.module.scss';

export default function Match({team}){
    const token = useSelector(state=>state.token);
    const [list, setList] = useState([]);

    useEffect(()=>{
        axios.get(TEAM_API+`${team.id}/matchs`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setList(response.data.data);
        }).catch(error=>{
            console.log(error.response.data.message)
        })
    }, [null]);

    return(
        <div className={styles.container}>
            {team.isCaptain ? <CreateMatchForm team={team} matchs={list} setMatchs={setList}></CreateMatchForm>: ''}
            <div className={styles.list}>
                {list.map((element,key)=>{
                    return(
                        <LazyLoad key={key} height={200} placeholder={<Loading/>}>
                            {console.log(element)}                       
                            <Item item={element} key={key}></Item>
                        </LazyLoad>
                    )
                })}
            </div>
        </div>
    )
}