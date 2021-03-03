import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function InfoHome(){
    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <img src="/avatar.jpg" className={styles.avatar}></img>
            </div>
            <div className={styles.row}>
                <span className={styles.name}>Lê Hoàng Long</span>
            </div>
            <div className={styles.row}>
                <FontAwesomeIcon icon={faStar} className={styles.star}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faStar} className={styles.star}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faStar} className={styles.star}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faStar} className={styles.star}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faStarHalf} className={styles.star}></FontAwesomeIcon>
            </div>
            <div className={styles.row}>
                <span className={styles.followers}>Followers: 200</span>
            </div>
            <div className={styles.row}>
                <span className={styles.friends}>Friends: 200</span>
            </div>
            <div className={styles.row}>
                <Link href="/long-lehoang">
                    <span className={styles.link}>View Profile</span>
                </Link>
            </div>
        </div>
    );
}