import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import Item from '../commons/Stadium';
import Filter from './filter'
import styles from './styles.module.scss'
export default function Stadium({stadium})
{
    const [list, setList] = useState(stadium||[]);
    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Stadiums" /></h3>

            <div className={styles.filter}>
                <Filter stadium={stadium} setStadium={setList} result={list}/>
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