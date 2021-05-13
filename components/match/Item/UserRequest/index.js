
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MATCH_JOINING_API, TEAM_SPORT } from '../../../../config/config';
import { setMessage } from '../../../../slices/messageSlice';
import Item from './Item';
import styles from './styles.module.scss';
//TODO
export default function UserRequest({show, setShow, match, team_id}) {
    const [list, setList] = useState([]);
    const [friends, setPeople] = useState([]);
    const token = useSelector(state=>state.token)
    const dispatch = useDispatch();

    function handleSearch(event){
        let search = event.target.value;
        let fr = friends.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setList(fr);
    }

    useEffect(()=>{
        axios.get(MATCH_JOINING_API +`friend_not_in_match/${match.id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setList(response.data.data);
            setPeople(response.data.data);
        }).catch(error=>{
            openMessageBox(error.response.data.message)
        })
    },[null])

    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title >Invite Friend to Join Match</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <input className={styles.search} placeholder={"Search Friends"} onChange={handleSearch}></input>
                <div className={styles.list}>
                    {list.map((element, key) => {   
                        return (
                            // <LazyLoad key={key} height={10} placeholder={<Loading/>}>                        
                            < Item key={key} id={element.id} username={element.username} name={element.name} team_id={team_id} match_id={match.id} avatar={element.avatar} ></Item>
                            // </LazyLoad>
                        )
                    })}
                </div>
            </Modal.Body>
        </Modal>
    )
}