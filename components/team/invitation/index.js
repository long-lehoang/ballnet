import { useState } from 'react';
import Filter from '../filter'
import Item from '../Item'
import styles from './styles.module.scss'
export default function Invitation({team})
{
    const [list, setList] = useState(team||[]);

    return(
        <div className={styles.container}>
            <h3>Team Invitation</h3>
            <div className={styles.filter}>
                <Filter team={team} setTeam={setList} result={list}/>
            </div>
            <div className={styles.lists}>
                {
                    team.map((item, key)=>{
                        return(
                            <Item item={item} key={key}/>
                        )
                    })
                }
            </div>
        </div>
    )
}