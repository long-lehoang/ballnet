import { Button, Modal } from "react-bootstrap";
import {toggleForm} from '../showCreateFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Image from 'next/image';

export default function CreateForm(){
    const show = useSelector(state => state.showCreateForm);

    const dispatch = useDispatch();
    const handleClose = () => {
        const action = toggleForm(false);
        dispatch(action);
    }
    return (
        <div>
            <Modal className={styles.container} show={show} onHide={handleClose}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <div className={styles.title}>
                        <Image src="/avatar.jpg" className={styles.avatar} width="40px" height="40px"></Image>
                        <div className={styles.name}>
                            <span className={styles.name}>Le Hoang Long</span>
                            <option></option>
                        </div>    
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles.footer}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
    
}