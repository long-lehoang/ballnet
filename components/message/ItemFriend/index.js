import styles from "./styles.module.scss"
import { HOST, AVATAR, ROOM } from "../.././../config/config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../slices/messageSlice";

export default function ItemFriend({ id, img, name, username, status, selectRoom, rooms, setRooms, setView={setView} }) {
    const src = img == null ? AVATAR : HOST + img;
    const token = useSelector(state=>state.token);
    const dispatch = useDispatch();

    function handleSelect(id) {
        let formData = new FormData();
        formData.append('members',id);
        axios.post(ROOM, formData ,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            let arr = rooms;
            if(arr.filter(ele=>ele.id == res.data.data.id).length == 0){
                setRooms(rooms=>[res.data.data].concat(rooms));
            }
            selectRoom(res.data.data.id);
            setView(0);
        }).catch((err)=>{
            openMessageBox('Error');
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <div onClick={() => handleSelect(id)} className={styles.container}>
            <img src={src} alt="avatar"></img>
            <div>
                <span className={styles.name}>{name}</span>
                <span className={styles.status}><span className={status == 0 ? styles.offline : styles.online}>{status == 0 ? <FormattedMessage id="Offline" /> : <FormattedMessage id="Online" />}</span></span>
            </div>
        </div>
    )
}