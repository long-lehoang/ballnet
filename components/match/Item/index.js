import { AVATAR_TEAM, HOST } from '../../../config/config';
import { setMessage } from '../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({item}){
    const time = new Date(item.time.split(", ")[0]);
    const type = item.type.split(" vs ")[0];
    const avatar1 = item.avatar1 == null ? null : HOST + item.avatar1;
    const avatar2 = item.avatar2 == null ? null : HOST + item.avatar2;

    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <div className={styles.container}>
            <div className={styles.team}>
                <img src={avatar1} className={styles.logo}></img>
                <span className={styles.member}>{`${item.member1}/${type}`}</span>
                <span>:</span>
                <span className={styles.member}>{`${item.member2}/${type}`}</span>
                {avatar2 == null ? <button>+</button> :
                <img src={avatar2} className={styles.logo}></img>
                }
                
            </div>
            <div className={styles.time}>
                <span>{time.toLocaleString()}</span>
            </div>
            <div className={styles.location}>
                <span>{item.stadium == null ? 'No Booking' : item.stadium}</span>
            </div>
            <div className={styles.type}>
                <span>{item.sport} &#40;{item.type}&#41;</span>
            </div>
            <div className={styles.btn}>
                <button className={styles.btnJoin}>Join</button>
                <button className={styles.btnShare}>Share</button>  
            </div>
        </div>
    )
}