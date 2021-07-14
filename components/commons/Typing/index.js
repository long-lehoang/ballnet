import styles from './styles.module.css';

export default function Typing()
{
    return (
        <div className={styles.half}>
            <div className={styles.typing}>
                <span className={styles.circle_scaling}></span>
                <span className={styles.circle_scaling}></span>
                <span className={styles.circle_scaling}></span>
            </div>
        </div>
    )
}