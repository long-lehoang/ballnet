import axios from 'axios';
import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { DELETE_API } from '../../../config/config';
import Confirmation from './Confirm';
import styles from './styles.module.scss';

export default function DeadactiveAccount() {
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [errMsgMail, setErrMsgMail] = useState('');
    const [errMsgPassword, setErrMsgPassword] = useState('');
    const router = useRouter();
    const token = useSelector(state => state.token);
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);

    function validate() {
        let error = false;
        if (password == '') {
            setErrMsgPassword('Field is not empty !');
            error = true;
        } else {
            setErrMsgPassword('');
        }

        if (mail == '') {
            setErrMsgMail('Field is not empty !');
            error = true;
        } else {
            setErrMsgMail('');
        }

        return !error;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setShow(true);
    }

    useEffect(()=>{
        if (confirm&&validate()) {
            var formData = new FormData();
            formData.append("password", password);
            formData.append("email", mail);
            axios.post(DELETE_API, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                removeCookie("user");
                router.push('/login');
            }).catch((error) => {
                setErrMsgMail(error.response.data.message);
                setErrMsgPassword(error.response.data.message);
            })
        }
    },[confirm])

    return (
        <div className={styles.container}>
            <Confirmation show={show} setShow={setShow} setConfirm={setConfirm} />
            <h3 className={styles.title}><FormattedMessage id="Deadactive Account" /></h3>
            <hr></hr>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <span className={styles.label}><FormattedMessage id="Password" /></span>
                        <span className={styles.errMsg}>{errMsgPassword}</span>
                    </div>
                    <input type="password" placeholder={"Mật khẩu"} onChange={(event) => { setPassword(event.target.value) }}></input>
                </div>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <span className={styles.label}><FormattedMessage id="Email" /></span>
                        <span className={styles.errMsg}>{errMsgMail}</span>
                    </div>
                    <input type="email" placeholder={"Email"} onChange={(event) => { setMail(event.target.value) }}></input>
                </div>
                <button type="submit"><FormattedMessage id="Delete" /></button>
                <button><FormattedMessage id="Cancel" /></button>
            </form>
        </div>
    )
}