import { AVATAR, HOST } from '../../../config/config';
import styles from './styles.module.scss';

export default function ComboAvatar({list = []}) {
    let img1, img2, img3, num;
    if(list.length>3){
        num = list.length-3
    }
    img1 = list[0] !== undefined ? (list[0] != null ? HOST + list[0] : AVATAR) : undefined
    img2 = list[1] !== undefined ? (list[1] != null ? HOST + list[1] : AVATAR) : undefined
    img3 = list[2] !== undefined ? (list[2] != null ? HOST + list[2] : AVATAR) : undefined
    
    
    return (
        <div className={styles.container}>
            {img1 !== undefined ?<img className={img2 === undefined ? styles.item11 : styles.item1} key={1} src={img1}></img> : ''}
            {img2 !== undefined ?<img className={img3 === undefined ? styles.item22 : num === undefined ? styles.item222 : styles.item2} key={2} src={img2}></img> : ''}
            {img3 !== undefined ?<img className={num === undefined ? styles.item33 : styles.item3} key={3} src={img3}></img> : ''}
            {num !== undefined ?<span className={styles.item4}>+{num}</span> : ''}
        </div>
    )
}