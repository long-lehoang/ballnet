import styles from './styles.module.scss';

export default function Filter(){
    return (
        <div className={styles.container}>
            <input className={styles.search} placeholder="Enter to find"></input>
            <select className={styles.select}>
                <option>Football</option>
            </select>
            <select className={styles.select}>
                <option>TP. Ho Chi Minh</option>
                <option>TP. Ho Chi Minh</option>
            </select>
            <select className={styles.select}>
                <option>Quan Thu Duc</option>
            </select>
        </div>
    )
}