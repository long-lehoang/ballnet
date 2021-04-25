import { useState } from 'react';
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
                            <Item item={item} key={key}/>
                        )
                    })
                }
            </div>
        </div>
    )
}