import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AVATAR, HOST } from '../../../config/config';
import styles from './styles.module.scss';

export default function InfoHome(){
    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);
    let link_profile = user != null ? user.username : "";

    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar}></img>
            </div>
            <div className={styles.row}>
                <span className={styles.name}>{user == null ? 'No Name' : user.name}</span>
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
                <Link href={"/" + link_profile}>
                    <span className={styles.link}>View Profile</span>
                </Link>
            </div>
        </div>
    );
}