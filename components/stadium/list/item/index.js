import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function Item(props){
    const [name, setName] = useState('Stadium');
    const [star, setStar] = useState(4);
    const [address, setAddress] = useState('ĐẠI HỌC NÔNG LÂM, KHU PHỐ 6, P. LINH TRUNG, Quận Thủ Đức, Tp Hồ Chí Minh');
    return(
        <div className={styles.container}>
            <img></img>
            <p className={styles.name}>{name}</p>
            <p className={styles.star}>star</p>
            <p className={styles.address}>{address}</p>
        </div>
    )
}