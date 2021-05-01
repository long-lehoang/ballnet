import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AVATAR, HOST } from '../../../config/config';
import styles from './styles.module.scss';


export default function CreateMatchForm({team = false}) {
    const [show, setShow] = useState(false);
    const profile = useSelector(state=>state.profile);
    return (
        <div className={styles.container}>
            <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
            <button className={styles.btn} onClick={() => setShow(true)}>Create Match</button>
            <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}>Create Match</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    
                </Modal.Body>
            </Modal>
        </div>
    )
}