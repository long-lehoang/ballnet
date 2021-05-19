import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import { MY_MATCH_API, PROFILE_API } from "../../../config/config";
import Loading from "../../commons/Loading";
import Item from "../../commons/MatchItem";
import styles from './styles.module.scss';

export default function Match({user_id}){
    const token = useSelector(state=>state.token);
    const [list, setList] = useState([]);

    useEffect(()=>{
        axios.get(PROFILE_API+`match/${user_id}`, {
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
            <div className={styles.list}>
                {list.map((element,key)=>{
                    return(
                        <LazyLoad key={key} height={200} placeholder={<Loading/>}>
                            <Item item={element} key={key}></Item>
                        </LazyLoad>
                    )
                })}
            </div>
        </div>
    )
}