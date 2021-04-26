import { AVATAR_TEAM } from '../../../config/config';
import loadStar from '../../../lib/star';
import styles from './styles.module.scss';

export default function Item({item}){
    const img = AVATAR_TEAM
    const name = 'Phú Thọ';
    const type = 'Football';
    const location = 'Quận Thủ Đức, TP. Hồ Chí Minh'
    return (
        <div className={styles.container}>
            <img src={img}></img>
            <div className={styles.info}>
                <p className={styles.name}>{name}</p>
                <p className={styles.star}>{loadStar(5, 15)}</p>
                <p className={styles.type}>{type}</p>
                <p className={styles.location}>{location}</p>
            </div>
        </div>
    )
}