
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { MY_TEAM_CAPTAIN_API } from '../../../../config/config';
import { setMessage } from '../../../../slices/messageSlice';
import Item from './Item';
import styles from './styles.module.scss';

export default function SelectTeam({ show, setShow, match }) {
    const [list, setList] = useState([]);
    const [teams, setTeams] = useState([]);
    const token = useSelector(state => state.token)
    const dispatch = useDispatch();

    function handleSearch(event) {
        let search = event.target.value;
        let fr = teams.filter(element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setList(fr);
    }

    useEffect(() => {
        axios.get(MY_TEAM_CAPTAIN_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            let teams = response.data.data.filter((team) => {
                return team.id !== match.team_1;
            });
            setList(teams);
            setTeams(teams);
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
                <Modal.Title ><FormattedMessage id="Select Team" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <input className={styles.search} placeholder={<FormattedMessage id="Search Teams" />} onChange={handleSearch}></input>
                <div className={styles.list}>
                    {list.map((element, key) => {
                        return (
                            // <LazyLoad key={key} height={10} placeholder={<Loading/>}>                        
                            < Item key={key} setShow={setShow} id={element.id} name={element.name} match_id={match.id} avatar={element.avatar} ></Item>
                            // </LazyLoad>
                        )
                    })}
                </div>
            </Modal.Body>
        </Modal>
    )
}