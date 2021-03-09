import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import {toggleForm} from './showCreateFormSlice';
import { AVATAR, HOST } from '../../../config/config';

export default function CreatePostForm(){
    const profile = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const handleShow = () => {
        const action = toggleForm(true);
        dispatch(action);
    }

    return(
        <div className={styles.container}>
            <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar}></img>
            <button className={styles.btn} onClick={() => handleShow()}>Post a status</button>
        </div>
    )
}