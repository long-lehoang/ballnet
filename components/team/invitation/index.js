import Filter from '../filter'
import Item from '../Item'
import styles from './styles.module.scss'
export default function Invitation({team})
{
    return(
        <div className={styles.container}>
            <h3>Team Invitation</h3>
            <div className={styles.filter}>
                <Filter/>
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