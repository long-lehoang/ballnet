import { useState } from 'react';
import Filter from './filter'
import Item from './Item'
import styles from './styles.module.scss'
export default function Team({team})
{
    const [list, setList] = useState(team||[]);

    return(
        <div className={styles.container}>
            <h3>Teams</h3>

            <div className={styles.filter}>
                <Filter team={team} setTeam={setList} result={list}/>
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