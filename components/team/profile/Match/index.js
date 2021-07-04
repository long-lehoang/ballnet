import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import { AVATAR, HOST, MATCH_API, TEAM_API } from "../../../../config/config";
import CreateMatchForm from "../../../commons/CreateMatchForm";
import Loading from "../../../commons/Loading";
import Item from "../../../commons/MatchItem";
import styles from './styles.module.scss';
import { FormattedMessage } from 'react-intl';

export default function Match({team}){
    const token = useSelector(state=>state.token);
    const [list, setList] = useState([]);
    const profile = useSelector(state => state.profile);
    const [show, setShow] = useState(false);

    useEffect(()=>{
        axios.get(TEAM_API+`${team.id}/matchs`, {
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
            {team.isCaptain ? <div>
                <div className={styles.addGroup}>
                    <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
                    <button className={styles.btn} onClick={() => setShow(true)}><FormattedMessage id="Create Match" /></button>
                </div>
                <CreateMatchForm show={show} setShow={setShow} team={team} matchs={list} setMatchs={setList}></CreateMatchForm>
            </div>: ''}
            <div className={styles.list}>
                {list.map((element,key)=>{
                    return(
                        <LazyLoad key={key} height={200} placeholder={<Loading/>}>
                            <Item item={element} key={element.id}></Item>
                        </LazyLoad>
                    )
                })}
            </div>
        </div>
    )
}