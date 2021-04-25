import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { AVATAR, HOST, TEAM_API } from '../../../../../config/config';
import { setMessage } from '../../../../../slices/messageSlice';
import Loading from '../../../../commons/Loading';
import Item from './Item';
import styles from './styles.module.scss';

export default function InviteForm({ friends }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [list, setList] = useState(friends)
    function handleSearch(event){
        let search = event.target.value;
        let fr = friends.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setList(fr);
    }

    return (
        <div>
            <button className={styles.btn_show} onClick={() => setShow(true)}>Invite to Join Team</button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title >Invite to Join Team</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <input className={styles.search} placeholder={"Search Friends"} onChange={handleSearch}></input>
                    <div className={styles.list}>
                        {list.map((element, key) => {
                            return (
                                // <LazyLoad key={key} height={10} placeholder={<Loading/>}>                        
                                < Item key={key} id={element.id} name={element.name} username={element.username} avatar={element.avatar} ></Item>
                                // </LazyLoad>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}