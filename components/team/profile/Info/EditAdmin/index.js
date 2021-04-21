import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

export default function EditAdmin(props) {
    
    function handleSubmit() {
        props.setShow(false)
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title >Administrator</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.setShow(false) }}>Close</Button>
                <Button variant="primary" onClick={() => { handleSubmit() }}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}