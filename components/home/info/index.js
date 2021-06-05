
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, FOLLOWS_API, FRIENDS_API, HOST, SPORT_API } from '../../../config/config';
import styles from './styles.module.scss';
import loadStar from '../../../lib/star';
import { FormattedMessage } from 'react-intl';

export default function InfoHome() {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);
    let link_profile = user != null ? user.username : "";
    const [friends, setFriends] = useState(0);
    const [match, setMatch] = useState(0);
    const [sport, setSport] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.username !== undefined) {

            axios.get(FRIENDS_API + user.username + '/count', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                setFriends(response.data.data);
            }).catch((error) => {
                console.log(error);
            });

            axios.get(SPORT_API + user.username + '/main', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setMatch(response.data.data.num_match || 0);
                setSport(response.data.data.sport || "");
                dispatch(setLoading(false));
            }).catch((error) => {
                console.log(error.response)
            })
        }
    }, [user])
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <Link href={"/" + link_profile}>
                    <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar} alt="Avatar"></img>
                </Link>
            </div>
            <div className={styles.row}>
                <span className={styles.name}>{user.name}</span>
            </div>
            <div className={styles.row}>
                <div className={styles.star}>
                    {loadStar(profile == null ? 0 : profile.points)}
                </div>
            </div>
            {/* <div className={styles.row}>
                <span className={styles.followers}><FormattedMessage id="Followers" />: {followers}</span>
            </div> */}
            <div className={styles.row}>
                <span className={styles.friends}><FormattedMessage id="Friends" />: {friends}</span>
            </div>
            <div className={styles.row}>
                <span className={styles.friends}><FormattedMessage id="Match" />: {match}</span>

            </div>
            <div className={styles.row}>
                <span className={styles.friends}><FormattedMessage id="Main Sport" />: {sport}</span>
            </div>
        </div>
    );
}