import Link from 'next/link';
import styles from './styles.module.scss';


export default function Notification(props){

    return(
        <Link href={props.link}>
            <div className={styles.container}>
                <div className={styles.col}>
                    <img src={props.avatar}></img>
                </div>
                <div className={props.read ? styles.read : styles.col}>
                    <p className={styles.text}>{props.text}</p>
                    <p className={styles.time}>{props.time}</p>
                </div>
            </div>
        </Link>
    )
}