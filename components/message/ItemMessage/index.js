import { useSelector } from "react-redux";
import { AVATAR, HOST } from "../../../config/config";
import { formatTimeMessage } from "../../../lib/time";
import styles from "./styles.module.scss";

export default function ItemMessage({ username, avatar, message, time }) {
    const user = useSelector(state => state.infoUser);
    let src = avatar == null ? AVATAR : HOST + avatar;
    let timez = formatTimeMessage(time)
    return (
        <div className={username == user.username ? styles.self : styles.friend}>
            <img src={src} alt="avatar"></img>
            <span className={styles.message}>{message}</span>
            <span className={styles.time}>{timez}</span>
        </div>
    )
}