import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PROFILE_API, TEAM_API } from '../../../../../config/config';
import styles from './styles.module.scss';

export default function EditOverview(props){
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState();
    const token = useSelector(state => state.token)
    function handleSubmit(){
        var formData = new FormData();
        formData.append('overview', value);
        axios.post(TEAM_API+`${props.id}/overview`,formData,{
            headers:{
                'Authorization' : `Bearer ${token}`
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
                <Modal.Title >Overview</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <p>{error}</p>
                <textarea value={value} onChange={(event)=>{setValue(event.target.value)}}></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{props.setShow(false)}}>Close</Button>
                <Button variant="primary" onClick={()=>{handleSubmit()}}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}