import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {setMessage} from "../../../slices/messageSlice";

export default function MessageBox() {
    const message = useSelector(state => state.message);
    const show = message.show||false;

    const dispatch = useDispatch();
    const handleClose = () => {
        const data = {show: false, message: '', title: ''};
        const action = setMessage(data);
        dispatch(action);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{message.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message.message}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                <FormattedMessage id="Close" />
            </Button>
            </Modal.Footer>
        </Modal>
    )
}