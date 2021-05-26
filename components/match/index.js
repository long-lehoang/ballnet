import { useState } from 'react';
import Filter from './Filter'
import Item from '../commons/MatchItem'
import styles from './styles.module.scss'
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import { FormattedMessage } from 'react-intl';
export default function Match({match})
{
    const [list, setList] = useState(match||[]);
    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Matches" /></h3>
            <div className={styles.filter}>
                <Filter match={match} setMatch={setList} result={list}/>
            </div>
            <div className={styles.lists}>
                {
                    list.map((item, key)=>{
                        return(
                            <LazyLoad key={key} height={200} placeholder={<Loading/>}>
                                <Item item={item} key={key}/>
                            </LazyLoad>
                        )
                    })
                }
            </div>
        </div>
    )
}