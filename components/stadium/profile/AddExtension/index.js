import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { STADIUM_API } from '../../../../config/config';
import styles from './styles.module.scss';

export default function AddExtension(props){
    const [value, setValue] = useState(props.stadium.extensions.map(ele => ele.extension).join(', '));
    const [error, setError] = useState();
    const token = useSelector(state => state.token)
    function handleSubmit(){
        var formData = new FormData();
        formData.append('extensions', value);
        axios.post(STADIUM_API+`${props.stadium.id}/extension`,formData,{
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        }).then((response)=>{
            props.setExtension(value.split(','));
            setError("");
            props.setShow(false);
        }).catch((error)=>{
            setError("Can't update!");
        })

    }

    return (
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Extension" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <p>{error}</p>
                <input value={value} onChange={(event)=>{setValue(event.target.value)}}></input>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{props.setShow(false)}}><FormattedMessage id="Close" /></Button>
                <Button variant="primary" onClick={()=>{handleSubmit()}}><FormattedMessage id="Save changes" /></Button>
            </Modal.Footer>
        </Modal>
    )
}