import { AVATAR, HOST } from '../../../config/config';
import styles from './styles.module.scss';

export default function ComboAvatar({list = []}) {
    
    return (
        <div styles={styles.container}>
            {list.forEach((element,key)=>{
                let img = element == null ? AVATAR : HOST + element;
                <img className={styles.item} key={key} src={img}></img>
            })}
        </div>
    )
}