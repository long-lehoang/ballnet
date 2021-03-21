import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_API, USERNAME_API } from '../../../config/config';
import { setUser } from '../../../slices/infoUserSlice';
import styles from './styles.module.scss';


export default function GeneralSetting(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.infoUser);

    const [name,setName] = useState(user.name);
    const [editName,toggleEditName] = useState(false);
    const [username,setUsername] = useState(user.username);
    const [editUsername,toggleEditUsername] = useState(false);
    const [errMsgName, setErrMsgName] = useState('');
    const [errMsgUsername, setErrMsgUsername] = useState('');
    const [error, setError] = useState(true);
    const [result, setResult] = useState(true);

    function validate(){
        if(name == user.name && username == user.username)
        return false;

        let error = false;
        if(name == '')
        {
            setErrMsgName('Field is not empty');
            error = true
        }else{
            setErrMsgName('');
        }

        if(username == '')
        {
            setErrMsgUsername('Field is not empty');
            error = true
        }else{
            setErrMsgUsername('');
        }

        return !error
    }

    function handleInputUsername(event){
        setUsername(event.target.value);
        if(event.target.value != ''){
            axios.get(USERNAME_API+event.target.value).then((response)=>{
                setErrMsgUsername('OK !');
                setError(false);
            }).catch(()=>{
                setError(true);
                setErrMsgUsername('Username was existed !');
            })
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        if(error){
            return false;
        }
        if(validate()){
            const token = localStorage.getItem('access_token');

            var formData = new FormData();
            formData.append("name",name);
            formData.append("username",username);
            axios.post(PROFILE_API+user.id,formData,{
                headers:{
                    'Authorization': token
                }
            }).then((response)=>{
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.data)
                );
                const actionUser = setUser(response.data.data);
                dispatch(actionUser);
            }).catch((error)=>{
                setResult("Failed to save");
            })
        }else{
            return false;
        }
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>General Setting</h3>
            <hr></hr>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <div>
                            <span className={styles.label}>Name</span>
                            <button onClick={()=>{toggleEditName(!editName)}}><FontAwesomeIcon className={styles.icon} icon={faEdit}></FontAwesomeIcon></button>
                        </div>
                        <span className={styles.errMsg}>{errMsgName}</span>
                    </div>
                    <span className={styles.txt}>{user.name==null ? '' : user.name}</span>
                    {editName ? <input value={name} maxlength="30" onChange={(event)=>{setName(event.target.value)}} className={styles.input}></input> : <div></div>}
                </div>
                <div className={styles.group}>
                    <div className={styles.header}>
                        <div>
                            <span className={styles.label}>Username</span>
                            <button onClick={()=>{toggleEditUsername(!editUsername)}}><FontAwesomeIcon className={styles.icon} icon={faEdit}></FontAwesomeIcon></button>
                        </div>
                        <span className={styles.errMsg}>{errMsgUsername}</span>
                    </div>
                    <span className={styles.txt}>{user.username==null ? '' : user.username}</span>
                    {editUsername ? <input value={username} maxlength="30" onChange={handleInputUsername} className={styles.input}></input> : <div></div>}
                </div>
                <button type="submit">Save Setting</button>
                <button>Cancel</button>
                <span className={styles.result}>{result}</span>

            </form>
        </div>
    )
}