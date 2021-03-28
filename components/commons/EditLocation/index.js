import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { PROFILE_API } from '../../../config/config';
import styles from './styles.module.scss';

export default function EditLocation(props){
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState();

    function handleSubmit(){
        var formData = new FormData();
        var token = localStorage.getItem('access_token');
        formData.append('address', value);
        axios.post(PROFILE_API+'address',formData,{
            headers:{
                'Authorization' : token
            }
        }).then((response)=>{
            props.setValue(value);
            setError("");
            props.setShow(false);
        }).catch((error)=>{
            setError("Can't update!");
        })
    }

    return (
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title >Location</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <p>{error}</p>
                <input value={value} onChange={(event)=>{setValue(event.target.value)}}></input>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{props.setShow(false)}}>Close</Button>
                <Button variant="primary" onClick={()=>{handleSubmit()}}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}