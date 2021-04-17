import { useState } from 'react';
import Filter from './Filter'
import Item from './Item'
import styles from './styles.module.scss'
export default function People({people})
{
    const [list, setList] = useState(people||[]);

    return(
        <div className={styles.container}>
            <div className={styles.filter}>
                <Filter people={people} setPeople={setList} result={list}/>
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