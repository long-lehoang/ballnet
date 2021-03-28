import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { PROFILE_API } from '../../../config/config';
import { setUser } from '../../../slices/infoUserSlice';

export default function EditPInfo(props){

    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [birthday, setBirthday] = useState(props.birthday);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    function handleSubmit(){
        var token = localStorage.getItem('access_token');
        var emailData = new FormData();
        emailData.append('email', email);
        axios.post(PROFILE_API+'email',emailData,{
            headers:{
                'Authorization' : token
            }
        }).then((response)=>{
            localStorage.setItem(
                'user',
                JSON.stringify(response.data.data)
            );
            const actionUser = setUser(response.data.data);
            dispatch(actionUser);

            props.setEmail(email);
        }).catch((error)=>{
            console.log(error);

            setError("Can't update email !");
        });

        var phoneData = new FormData();
        phoneData.append('phone', phone);
        axios.post(PROFILE_API+'phone',phoneData,{
            headers:{
                'Authorization' : token
            }
        }).then((response)=>{
            props.setPhone(phone);
        }).catch((error)=>{
            console.log(error);

            setError("Can't update phone !");
        });

        var birthdayData = new FormData();
        birthdayData.append('birthday', birthday);
        axios.post(PROFILE_API+'birthday',birthdayData,{
            headers:{
                'Authorization' : token
            }
        }).then((response)=>{
            props.setBirthday(birthday);
        }).catch((error)=>{
            console.log(error);
            setError("Can't update birthday !");
        });
        setTimeout(()=>{
            if(error == "")
            props.setShow(false)
        }, 2000);

    }

    return (
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title >Personal Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <p>{error}</p>
                <input type="email" placeholder="Email" value={email} onChange={(event)=>{setEmail(event.target.value)}}></input>
                <input type="text" placeholder="Phone" value={phone} onChange={(event)=>{setPhone(event.target.value)}}></input>
                <input type="date" placeholder="dd/mm/yyyy" value={birthday} onChange={(event)=>{setBirthday(event.target.value)}}></input>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setError("");props.setShow(false)}}>Close</Button>
                <Button variant="primary" onClick={()=>{handleSubmit()}}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}