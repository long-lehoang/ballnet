import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import {toggleForm} from './showCreateFormSlice';

export default function CreatePostForm(){
    const dispatch = useDispatch();
    const handleShow = () => {
        const action = toggleForm(true);
        dispatch(action);
    }

    return(
        <div className={styles.container}>
            <img src="/avatar.jpg" className={styles.avatar}></img>
            <button className={styles.btn} onClick={() => handleShow()}>Post a status</button>
        </div>
    )
}