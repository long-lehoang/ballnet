
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { MATCH_API, MATCH_JOINING_API, TEAM_SPORT } from '../../../../config/config';
import { setMessage } from '../../../../slices/messageSlice';
import Item from './Item';
import styles from './styles.module.scss';

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
        axios.get(MATCH_API +`${match.id}/request/${team_id}`, {
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
                <Modal.Title ><FormattedMessage id="User Request To Join Match" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <input className={styles.search} placeholder={<FormattedMessage id="Search Request" />} onChange={handleSearch}></input>
                <div className={styles.list}>
                    {list.map((element, key) => {
                        return (
                            // <LazyLoad key={key} height={10} placeholder={<Loading/>}>                        
                            < Item key={key} item={element} setList={setList} setPeople={setPeople} request={friends} ></Item>
                            // </LazyLoad>
                        )
                    })}
                </div>
            </Modal.Body>
        </Modal>
    )
}