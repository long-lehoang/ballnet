
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, MY_TEAM_CAPTAIN_API } from '../../../config/config';
import styles from './styles.module.scss';

export default function SelectTeam({ team, setTeam, show, setShow, setShowCreate }) {
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
            let teams = response.data.data
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

    function handleSelect()
    {
        setShow(false);
        setShowCreate(true);
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Select Team" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <input className={styles.search} placeholder={"Tìm đội"} onChange={handleSearch}></input>
                <div className={styles.list}>
                    {list.map((element, key) => {
                        let img = element.avatar == null ? AVATAR_TEAM : HOST + element.avatar;
                        return (
                            <div className={styles.item} key={element.id}>
                                <div>
                                    <img src={img}></img>
                                    <Link href={`/team/${element.id}`}><span>{element.name}</span></Link>
                                </div>
                                <button onClick={()=>{setTeam(element)}} disabled={element == team ? "disabled" : ""}><FormattedMessage id="Select" /></button>
                            </div>
                        )
                    })}
                </div>
                <button className={styles.btnAddMatch} onClick={handleSelect} disabled={ team == undefined ? "disabled" : ""}><FormattedMessage id="Create Match" /></button>
            </Modal.Body>
        </Modal>
    )
}