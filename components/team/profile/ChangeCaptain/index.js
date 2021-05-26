import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { TEAM_API } from '../../../../config/config';
import Item from './Item';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
export default function ChangeCaptain({ team, show, setShow, setMember, openMessageBox }) {
    const [members, setMembers] = useState([]);
    const [choice, setChoice] = useState();
    const token = useSelector(state => state.token);
    const router = useRouter();
    
    function handleSearch(event) {
        let search = event.target.value;
        let fr = friends.filter(element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setList(fr);
    }
    function handleSubmit(){
        var formData = new FormData();
        formData.append('captain_id', choice);
        axios.post(TEAM_API + `${team.id}/captain`,formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setShow(false);
            axios.delete(TEAM_API + `${team.id}/leave`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then((response)=>{
                setMember(false);
                router.push('/');
            }).catch(error=>{
                openMessageBox(error.response.data.message);
            })
        }).catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        let isMounted = true;
        axios.get(TEAM_API + `${team.id}/member`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            let data = response.data.data;
            if (isMounted) {
                setMembers(data);
            }
        }).catch(error => {
            console.log(error);
        });

        return () => { isMounted = false };
    }, []);

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Change Captain" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <input className={styles.search} placeholder={"Tìm bạn bè"} onChange={handleSearch}></input>
                <div className={styles.list}>
                    {members.map((element, key) => {
                        return (
                            <Item key={key} member={element} choice={choice} setChoice={setChoice}></Item>
                        )
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.setShow(false) }}><FormattedMessage id="Close" /></Button>
                <Button variant="primary" onClick={() => { handleSubmit() }}><FormattedMessage id="Save changes" /></Button>
            </Modal.Footer>
        </Modal>
    )
}