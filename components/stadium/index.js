import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import Filter from './filter'
import Item from './Item'
import styles from './styles.module.scss'
export default function Stadium({stadium})
{
    const [list, setList] = useState(stadium||[]);
    return(
        <div className={styles.container}>
            <h3>Stadiums</h3>

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