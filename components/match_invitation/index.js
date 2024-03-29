import { useState } from 'react';
import Filter from './Filter'
import Item from '../commons/MatchItem'
import styles from './styles.module.scss'
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import { FormattedMessage } from 'react-intl';
export default function MatchInvitation({match})
{
    const [list, setList] = useState(match||[]);
    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Match Invitation" /></h3>
            <div className={styles.filter}>
                <Filter match={match} setMatch={setList} result={list}/>
            </div>
            <div className={styles.lists}>
                {
                    list.length == 0 ? <h3><FormattedMessage id="No Item" /></h3> : list.map((item, key)=>{
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