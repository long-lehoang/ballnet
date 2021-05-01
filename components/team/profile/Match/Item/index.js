import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({item}){
    
    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <div className={styles.container}>
            <div className={styles.team}>
                <img src="/avatar_team.jpg" className={styles.logo}></img>
                <span className={styles.member}>5/7</span>
                <span>:</span>
                <span className={styles.member}>5/7</span>
                <img src="/avatar_team.jpg" className={styles.logo}></img>
            </div>
            <div className={styles.time}>
                <span>Tomorrow, 20:00 UTC+07</span>
            </div>
            <div className={styles.location}>
                <span>Phu Tho Stadium</span>
            </div>
            <div className={styles.type}>
                <span>Bong Da &#40;5 vs 5&#41;</span>
            </div>
            <div className={styles.btn}>
                <button className={styles.btnJoin}>Join</button>
                <button className={styles.btnShare}>Share</button>
            </div>
        </div>
    )
}