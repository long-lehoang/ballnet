import axios from 'axios';
import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DELETE_API } from '../../../config/config';
import styles from './styles.module.scss';

export default function DeadactiveAccount(){
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [errMsgMail, setErrMsgMail] = useState('');
    const [errMsgPassword, setErrMsgPassword] = useState('');
    const router = useRouter();
    
    function validate(){
        let error = false;
        if(password == ''){
            setErrMsgPassword('Field is not empty !');
            error = true;
        }else{
            setErrMsgPassword('');
        }

        if(mail == ''){
            setErrMsgMail('Field is not empty !');
            error = true;
        }else{
            setErrMsgMail('');
        }

        return !error;
    }

    function handleSubmit(event){
        event.preventDefault();
        if(validate()){
            const token = localStorage.getItem('access_token');

            var formData = new FormData();
            formData.append("password", password);
            formData.append("email", mail);
            axios.post(DELETE_API, formData, {
                headers:{
                    'Authorization': token
                }
            }).then((response)=>{
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                router.push('/login');
            }).catch((error)=>{
                setErrMsgMail(error.response.data.message);
                setErrMsgPassword(error.response.data.message);
            })
        }else{
            return false;
        }
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Deadactive Account</h3>
            <hr></hr>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <span className={styles.label}>Password</span>
                        <span className={styles.errMsg}>{errMsgPassword}</span>
                    </div>
                    <input type="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}></input>
                </div>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.errMsg}>{errMsgMail}</span>
                    </div>
                    <input type="email" placeholder="Email" onChange={(event)=>{setMail(event.target.value)}}></input>
                </div>
                <button type="submit">Delete</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}