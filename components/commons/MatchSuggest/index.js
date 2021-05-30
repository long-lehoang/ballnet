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
                        <Item key={element.id} item={element} />
                    )
                })}
            </div>
        </div>
    )
}