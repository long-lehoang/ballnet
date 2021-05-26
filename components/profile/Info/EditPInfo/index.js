import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../../../slices/infoUserSlice';
import { useCookies } from 'react-cookie';
import { PROFILE_API } from '../../../../config/config';
import { FormattedMessage } from 'react-intl';

export default function EditPInfo(props){

    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [birthday, setBirthday] = useState(props.birthday);
    const [errEmail, setErrEmail] = useState("");
    const [errPhone, setErrPhone] = useState("");
    const [errBirthday, setErrBirthday] = useState("");
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const [cookie, setCookie] = useCookies(["user"]);
    async function handleSubmit(){
        var emailData = new FormData();
        emailData.append('email', email);
        let err = false ;
        setErrEmail("");
        setErrPhone("");
        setErrBirthday("");
        await axios.post(PROFILE_API+'email',emailData,{
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        }).then((response)=>{
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

            props.setEmail(email);
        }).catch((error)=>{
            console.log(error);
            err = true;
            setErrEmail("Can't update email !");
        });

        var phoneData = new FormData();
        phoneData.append('phone', phone);
        await axios.post(PROFILE_API+'phone',phoneData,{
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        }).then((response)=>{
            props.setPhone(phone);
        }).catch((error)=>{
            console.log(error);
            err = true;

            setErrPhone("Can't update phone !");
        });

        var birthdayData = new FormData();
        birthdayData.append('birthday', birthday);
        await axios.post(PROFILE_API+'birthday',birthdayData,{
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        }).then((response)=>{
            props.setBirthday(birthday);
        }).catch((error)=>{
            err = true;
            console.log(error);
            setErrBirthday("Can't update birthday !");
        });
        if(!err)
        props.setShow(false)

    }

    return (
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Personal Information" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <p>{errEmail}</p>
                <input type="email" placeholder={<FormattedMessage id="Email" />} value={email} onChange={(event)=>{setEmail(event.target.value)}}></input>
                <p>{errPhone}</p>
                <input type="text" placeholder={<FormattedMessage id="Phone Number" />} value={phone} onChange={(event)=>{setPhone(event.target.value)}}></input>
                <p>{errBirthday}</p>
                <input type="date" placeholder="dd/mm/yyyy" value={birthday} onChange={(event)=>{setBirthday(event.target.value)}}></input>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{props.setShow(false)}}><FormattedMessage id="Close" /></Button>
                <Button variant="primary" onClick={()=>{handleSubmit()}}><FormattedMessage id="Save changes" /></Button>
            </Modal.Footer>
        </Modal>
    )
}