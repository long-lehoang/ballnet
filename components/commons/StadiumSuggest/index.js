import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, SUGGEST_API } from '../../../config/config';
import loadStar from '../../../lib/star';
import styles from './styles.module.scss';
import { FormattedMessage } from 'react-intl';

export default function StadiumSuggest() {
    const [list, setList] = useState([]);
    const token = useSelector(state => state.token);
    useEffect(() => {
        axios.get(SUGGEST_API + 'stadium', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setList(response.data.data)
        }).catch(error => {
            console.log(error);
        })
    }, [null])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span><FormattedMessage id="Stadium Suggestion" /></span>
            </div>
            <div className={styles.body}>
                {
                    list.map((element, key) => {
                        return (
                            <Link href={`/stadium/${element.id}`}>
                                <div className={styles.element}>
                                    <div className={styles.avatar}>
                                        <img src={element.avatar == null ? AVATAR_TEAM : HOST + element.avatar} alt="Avatar Stadium"></img>
                                    </div>
                                    <div className={styles.description}>
                                        <div className={styles.name}>
                                            <span>{element.name}</span>
                                        </div>
                                        
                                        <div className={styles.groupStar}>
                                            {loadStar(element.rating, 15)}
                                        </div>
                                        <div className={styles.location}>
                                            <span>{element.location.split(', ')[3]}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}