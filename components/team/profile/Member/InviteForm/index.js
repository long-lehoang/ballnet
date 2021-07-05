import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { TEAM_API } from '../../../../../config/config';
import Item from './Item';
import styles from './styles.module.scss';

export default function InviteForm({ team }) {
    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);

    const token = useSelector(state=>state.token);

    function handleSearch(event){
        let search = event.target.value;
        let fr = friends.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setList(fr);
    }

    useEffect(()=>{
        axios.get(TEAM_API + `${team.id}/invite`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setList(response.data.data);
            
        }).catch(error => {
            console.log(error);
        });
    },[null])

    return (
        <div>
            <button className={styles.btn_show} onClick={() => setShow(true)}><FormattedMessage id="Invite to Join Team" /></button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title ><FormattedMessage id="Invite to Join Team" /></Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <input className={styles.search} placeholder={"Tìm bạn bè"} onChange={handleSearch}></input>
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