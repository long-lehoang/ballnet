import { AVATAR_TEAM, BOOKING_API} from '../../../config/config'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { setMessage } from '../../../slices/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
export default function ReviewStadium({ show, setShow, book_id, setDel }) {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [stadium, setStadium] = useState();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);

    function handleRating(newRating) {
        setRating(newRating);
    }

    function handleSubmit(event) {
        event.preventDefault()
        let formData = new FormData();
        formData.append('feedback', feedback);
        formData.append('rating', rating);

        axios.post(BOOKING_API + `${book_id}/review`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setShow(false);
            setDel(true);
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    useEffect(() => {
        axios.get(BOOKING_API + `${book_id}/review`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setStadium(response.data.data);
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }, [null])

    return (
        <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
            <Modal.Header className={styles.header} closeButton>
                <Modal.Title className={styles.title}><FormattedMessage id="Review Stadium" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <form onSubmit={handleSubmit}>
                    <h5><FormattedMessage id="Review Stadium" /></h5>
                    <div className={styles.item}>
                        <div className={styles.name}>
                            <img src={AVATAR_TEAM}></img>
                            <span className={styles.text}>{stadium == undefined ? '' : stadium.name}</span>
                        </div>
                        <ReactStars
                            count={5}
                            size={15}
                            activeColor="#ffd700"
                            onChange={handleRating}
                        />
                    </div>
                    <textarea onChange={(event)=>setFeedback(event.target.value)}></textarea>
                    <button type="submit" className={styles.btnSubmit}><FormattedMessage id="Submit" /></button>
                </form>
            </Modal.Body>
        </Modal>
    )
}