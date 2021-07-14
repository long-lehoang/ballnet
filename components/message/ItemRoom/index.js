import styles from "./styles.module.scss"
import { HOST, AVATAR } from "../.././../config/config";
import { useState } from "react";
import { formatTimeMessage } from "../../../lib/time";

export default function ItemRoom({ selectRoom, id, img, name, selected, lastMessage, lastTime }) {
    const src = img == null ? AVATAR : HOST + img;
    const time = formatTimeMessage(lastTime);
    return (
        <div onClick={() => selectRoom(id)} className={selected ? styles.active : styles.container}>
            <div>
                <img src={src} alt="avatar"></img>
                <div>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.message}>{lastMessage}</span>
                </div>
            </div>
            <span>{time}</span>
        </div>
    )
}