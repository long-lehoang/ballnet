
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';

export default function Confirmation({show, setShow, setConfirm}) {
    
    return (
        <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
            <Modal.Header className={styles.header} closeButton>
                <Modal.Title className={styles.title}><FormattedMessage id="Deadactive Account" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <FormattedMessage id="Confirm Delete" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {setShow(false);setConfirm(true)}}>
                    <FormattedMessage id="Yes" />
                </Button>
                <Button variant="secondary" onClick={() => {setShow(false);setConfirm(false)}}>
                    <FormattedMessage id="No" />
                </Button>
            </Modal.Footer>
        </Modal>
    )
}