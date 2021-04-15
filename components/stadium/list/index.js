import Filter from './filter';
import Item from './item';
import styles from './styles.module.scss';

export default function Statidum({statdiums}){
    return(
        <div className={styles.container}>
            <Filter className={styles.filter}></Filter>
            <div className={styles.list}>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
            </div>
            
        </div>
    )
}