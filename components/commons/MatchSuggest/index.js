import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { SUGGEST_API } from '../../../config/config';
import Item from '../MatchItem';
import styles from './styles.module.scss';

export default function MatchSuggest() {
    const [list, setList] = useState([]);
    const token = useSelector(state => state.token);
    useEffect(() => {
        axios.get(SUGGEST_API + 'match', {
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
                <span><FormattedMessage id="Match Suggestion" /></span>
            </div>
            <div className={styles.body}>
                {list.map((element,key)=>{
                    return(
                        <Item key={key} item={element} />
                    )
                })}

                {/* <div className={styles.element}>
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
                </div> */}
            </div>
        </div>
    )
}