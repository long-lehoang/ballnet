import Link from 'next/link';
import { AVATAR_TEAM } from '../../../config/config';
import loadStar from '../../../lib/star';
import styles from './styles.module.scss';

export default function Item({item}){
    const img = item.avatar == null ? AVATAR_TEAM : HOST + item.avatar
    return (
        <div className={styles.container}>
            <Link href={`/stadium/${item.id}`}>
            <img src={img}></img>
            </Link>
            <div className={styles.info}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.star}>{loadStar(item.rating, 15)}</p>
                <p className={styles.type}>{item.sport}</p>
                <p className={styles.location}>{item.location}</p>
                <p className={styles.phone}>{item.phone}</p>
            </div>
        </div>
    )
}