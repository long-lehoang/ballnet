
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { STADIUM_API } from '../../../../config/config';
import { setMessage } from '../../../../slices/messageSlice';
import Item from './Item';
import styles from './styles.module.scss';

export default function Booking({ show, setShow, match }) {
    const [list, setList] = useState([]);
    const [stadium, setStadium] = useState([]);
    const token = useSelector(state => state.token)
    const dispatch = useDispatch();

    function handleSearch(event) {
        let search = event.target.value;
        let fr = stadium.filter(element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setList(fr);
    }

    useEffect(() => {
        axios.get(STADIUM_API + `sport/${match.sport}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setList(response.data.data);
            setStadium(response.data.data);
        }).catch(error => {
            openMessageBox(error.response.data.message)
        })
    }, [null])

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Book Stadium" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <input className={styles.search} placeholder={"Tìm sân vận động"} onChange={handleSearch}></input>
                <div className={styles.list}>
                    {list.map((element, key) => {
                        return (
                            // <LazyLoad key={key} height={10} placeholder={<Loading/>}>                        
                            < Item key={key}
                                id={element.id}
                                name={element.name}
                                match_id={match.id}
                                avatar={element.avatar}
                                location={element.location}
                                phone={element.phone}
                                setShow={setShow}
                                rating={element.rating}
                            />
                            // </LazyLoad>
                        )
                    })}
                </div>
            </Modal.Body>
        </Modal>
    )
}