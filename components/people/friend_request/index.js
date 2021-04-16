import Filter from '../Filter'
import Item from '../Item'
import styles from './styles.module.scss'
export default function FriendRequest({friendRequest})
{
    return(
        <div className={styles.container}>
            <h3>Friend Requests</h3>
            <div className={styles.filter}>
                <Filter/>
            </div>
            <div className={styles.lists}>
                {
                    friendRequest.map((item, key)=>{
                        return(
                            <Item item={item} key={key}/>
                        )
                    })
                }
            </div>
        </div>
    )
}