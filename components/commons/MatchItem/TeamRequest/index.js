
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MATCH_API } from '../../../../config/config';
import { setMessage } from '../../../../slices/messageSlice';
import Item from './Item';
import styles from './styles.module.scss';

export default function TeamRequest({show, setShow, match}) {
    const [list, setList] = useState([]);
    const [teams, setTeams] = useState([]);
    const token = useSelector(state=>state.token)
    const dispatch = useDispatch();

    function handleSearch(event){
        let search = event.target.value;
        let fr = teams.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setList(fr);
    }

    useEffect(()=>{
        axios.get(MATCH_API +`${match.id}/team/request`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setList(response.data.data);
            setTeams(response.data.data);
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
                <Modal.Title >Team Request To Join Match</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <input className={styles.search} placeholder={"Search Request"} onChange={handleSearch}></input>
                <div className={styles.list}>
                    {list.map((element, key) => {   
                        return (
                            // <LazyLoad key={key} height={10} placeholder={<Loading/>}>                        
                            < Item key={key} item={element} setList={setList} setTeams={setTeams} request={teams} ></Item>
                            // </LazyLoad>
                        )
                    })}
                </div>
            </Modal.Body>
        </Modal>
    )
}