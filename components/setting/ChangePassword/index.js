import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { PASSWORD_API } from '../../../config/config';
import { setToken } from '../../../slices/tokenSlice';
import styles from './styles.module.scss';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errMsgOld, setErrMsgOld] = useState('');
    const [errMsgNew, setErrMsgNew] = useState('');
    const [errMsgRepeat, setErrMsgRepeat] = useState('');
    const dispatch = useDispatch()
    const token = useSelector(state=>state.token)
    const [cookie, setCookie] = useCookies(["user"]);

    function validate() {
        let error = false;
        if (oldPassword == '') {
            setErrMsgOld('Field is not empty !');
            error = true;
        } else {
            setErrMsgOld('');
        }

        if (newPassword == '') {
            setErrMsgNew('Field is not empty !');
            error = true;
        } else {
            setErrMsgNew('');
        }

        if (repeatPassword == '') {
            setErrMsgRepeat('Field is not empty !');
            error = true;
        } else {
            setErrMsgRepeat('');
        }

        if (repeatPassword != newPassword) {
            setErrMsgRepeat('Repeat Password does not match !');
            error = true;
        } else {
            setErrMsgRepeat('');
        }

        return !error;
    }
    function resetForm() {
        setOldPassword("");
        setNewPassword("");
        setRepeatPassword("");
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (validate()) {

            var formData = new FormData();
            formData.append('current_password', oldPassword);
            formData.append('new_password', newPassword);
            formData.append('new_password_confirmation', repeatPassword);
            axios.post(PASSWORD_API, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                let user = cookie.user;
                user.access_token = response.data.data.new_token;
                const time = new Date(user.expires_at);
                setCookie("user", JSON.stringify(user), {
                    path: "/",
                    expires: time,
                    sameSite: true,
                })
                const actionToken = setToken(response.data.data.new_token);
                dispatch(actionToken);
                resetForm();
            }).catch((response) => {
                setErrMsgOld("Password is incorrect !")
            })
        } else {
            return false;
        }
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Change Password</h3>
            <hr></hr>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <span className={styles.label}>Old Password</span>
                        <span className={styles.errMsg}>{errMsgOld}</span>
                    </div>
                    <input value={oldPassword} type="password" placeholder="Old Password" onChange={(event) => { setOldPassword(event.target.value) }}></input>
                </div>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <span className={styles.label}>New Password</span>
                        <span className={styles.errMsg}>{errMsgNew}</span>
                    </div>
                    <input value={newPassword} type="password" placeholder="New Password" onChange={(event) => { setNewPassword(event.target.value) }}></input>
                </div>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <span className={styles.label}>Repeat Password</span>
                        <span className={styles.errMsg}>{errMsgRepeat}</span>
                    </div>
                    <input value={repeatPassword} type="password" placeholder="Repeat Password" onChange={(event) => { setRepeatPassword(event.target.value) }}></input>
                </div>
                <button type="submit">Save Setting</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}