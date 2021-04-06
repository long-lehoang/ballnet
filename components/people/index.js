import Item from './Item'
import styles from './styles.module.scss'
export default function People({people})
{
    return(
        <div className={styles.container}>
            {/* <FilterPeopleForm className={styles.filter} /> */}
            <div className={styles.lists}>
                {
                    people.map((item, key)=>{
                        return(
                            <Item item={item} key={key}/>
                        )
                    })
                }
            </div>
        </div>
    )
}