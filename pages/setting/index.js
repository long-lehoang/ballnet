import LayoutMain from '../../components/layout/main'
import checkLogin from '../../lib/user'
import ChangePassword from '../../components/setting/ChangePassword'
import GeneralSetting from '../../components/setting/General'
import DeadactiveAccount from '../../components/setting/DeadactiveAccount'
import MyBooking from '../../components/setting/MyBooking'

import { useState } from 'react'
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendar, faCog, faCogs, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Setting() {
    const [option, setOption] = useState(1);
    
    checkLogin();
    function loadComponent(option){
        switch (option){
            case 1:
                return (<GeneralSetting></GeneralSetting>)
            case 2:
                return (<ChangePassword></ChangePassword>)

            case 3:
                return (<DeadactiveAccount></DeadactiveAccount>)

            case 4:    
                return (<MyBooking></MyBooking>)
            default:
                return (<GeneralSetting></GeneralSetting>)
        }
    }

    return (
        <LayoutMain>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <button onClick={()=>{setOption(1)}}>
                        <FontAwesomeIcon icon={faCog} className={styles.icon}></FontAwesomeIcon>
                        <span>General</span>
                    </button>
                    <button onClick={()=>{setOption(2)}}>
                        <FontAwesomeIcon icon={faLock} className={styles.icon}></FontAwesomeIcon>
                        <span>Change Password</span>
                    </button>
                    <button onClick={()=>{setOption(3)}}>
                        <FontAwesomeIcon icon={faTrash} className={styles.icon}></FontAwesomeIcon>
                        <span>Deadactive Account</span>
                    </button>
                    <button onClick={()=>{setOption(4)}}>
                        <FontAwesomeIcon icon={faBook} className={styles.icon}></FontAwesomeIcon>
                        <span>My booking</span>
                    </button>
                </div>
                <div className={styles.content}>
                    {loadComponent(option)}
                </div>
            </div>
        </LayoutMain>
    )
}