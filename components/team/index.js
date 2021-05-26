import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import Filter from './filter'
import Item from './Item'
import styles from './styles.module.scss'
export default function Team({team})
{
    const [list, setList] = useState(team||[]);

    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Teams" /></h3>

            <div className={styles.filter}>
                <Filter team={team} setTeam={setList} result={list}/>
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