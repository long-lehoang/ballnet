import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_API, USERNAME_API } from '../../../config/config';
import { setUser } from '../../../slices/infoUserSlice';
import styles from './styles.module.scss';


export default function GeneralSetting() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.infoUser);
    const [name, setName] = useState();
    const [editName, toggleEditName] = useState(false);
    const [username, setUsername] = useState();
    const [editUsername, toggleEditUsername] = useState(false);
    const [errMsgName, setErrMsgName] = useState('');
    const [errMsgUsername, setErrMsgUsername] = useState('');
    const [error, setError] = useState(false);
    const [result, setResult] = useState(true);
    const token = useSelector(state => state.token);
    const [cookie, setCookie] = useCookies(["user"]);

    useEffect(() => {
        setName(user.name);
        setUsername(user.username);
    }, [null]);

    function validate() {
        if (name == user.name && username == user.username)
            return false;

        let error = false;
        if (name == '') {
            setErrMsgName('Field is not empty');
            error = true
        } else {
            setErrMsgName('');
        }

        if (username == '') {
            setErrMsgUsername('Field is not empty');
            error = true
        } else {
            setErrMsgUsername('');
        }

        return !error
    }

    function handleInputUsername(event) {
        setUsername(event.target.value);
        if (event.target.value != '') {
            axios.get(USERNAME_API + event.target.value).then((response) => {
                setErrMsgUsername('OK !');
                setError(false);
            }).catch(() => {
                setError(true);
                setErrMsgUsername('Username was existed !');
            })
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (error) {
            return false;
        }
        if (validate()) {
            var nameData = new FormData();
            nameData.append("name", name);
            axios.post(PROFILE_API + 'name', nameData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                let user = cookie.user;
                user.user = response.data.data;
                const time = new Date(user.expires_at);
                setCookie("user", JSON.stringify(user), {
                    path: "/",
                    expires: time,
                    sameSite: true,
                })
                const actionUser = setUser(response.data.data);
                dispatch(actionUser);
            }).catch((error) => {
                console.log(error);
                setResult("Failed to save name");
            });

            var usernameData = new FormData();
            usernameData.append("username", username);

            axios.post(PROFILE_API + 'username', usernameData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                let user = cookie.user;
                user.user = response.data.data;
                const time = new Date(user.expires_at);
                setCookie("user", JSON.stringify(user), {
                    path: "/",
                    expires: time,
                    sameSite: true,
                })
                const actionUser = setUser(response.data.data);
                dispatch(actionUser);
            }).catch((error) => {
                setResult("Failed to save username");
            })
        } else {
            console.log("false");
            return false;
        }
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.title}><FormattedMessage id="General Setting" /></h3>
            <hr></hr>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <div>
                            <span className={styles.label}><FormattedMessage id="Name" />: </span>
                            <span className={styles.txt}>{user == null ? '' : user.name}</span>
                            <button onClick={() => { toggleEditName(!editName) }}><FontAwesomeIcon className={styles.icon} icon={faEdit}></FontAwesomeIcon></button>
                        </div>
                        <span className={styles.errMsg}>{errMsgName}</span>
                    </div>
                    {editName ? <input value={name} maxlength="30" onChange={(event) => { setName(event.target.value) }} className={styles.input}></input> : <div></div>}
                </div>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <div>
                            <span className={styles.label}><FormattedMessage id="Username" />: </span>
                            <span className={styles.txt}>{user == null ? '' : user.username}</span>
                            <button onClick={() => { toggleEditUsername(!editUsername) }}><FontAwesomeIcon className={styles.icon} icon={faEdit}></FontAwesomeIcon></button>
                        </div>
                        <span className={styles.errMsg}>{errMsgUsername}</span>
                    </div>
                    {editUsername ? <input value={username} maxlength="30" onChange={handleInputUsername} className={styles.input}></input> : <div></div>}
                </div>
                <button type="submit"><FormattedMessage id="Save Setting" /></button>
                <button><FormattedMessage id="Cancel" /></button>
                <span className={styles.result}>{result}</span>

            </form>
        </div>
    )
}