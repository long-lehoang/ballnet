import { useState } from 'react';
import Filter from './Filter'
import Item from './Item'
import styles from './styles.module.scss'
export default function Match({match})
{
    const [list, setList] = useState(match||[]);

    return(
        <div className={styles.container}>
            <h3>Matches</h3>
            <div className={styles.filter}>
                <Filter match={match} setMatch={setList} result={list}/>
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