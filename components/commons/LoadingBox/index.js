import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
export default function LoadingBox() {
    const loading = useSelector(state => state.loading);
    return (
        <div className={loading ? styles.container : styles.none}>
            <div className={styles.loader}>
                <img src="/loader.gif" />
            </div>
        </div >
    )
}