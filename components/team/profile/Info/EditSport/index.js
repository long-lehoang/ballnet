import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { PROFILE_API, SPORT_CATEGORY_API, TEAM_API } from '../../../../../config/config';
import styles from './styles.module.scss';

export default function EditSport(props){
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState();
    const [listSport, setListSport] = useState([]);

    const token = useSelector(state => state.token)
    function handleSubmit(){
        var formData = new FormData();
        formData.append('sport', value);
        axios.post(TEAM_API+`${props.id}/sport`,formData,{
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        }).then((response)=>{
            props.setValue(value);
            setError("");
            props.setShow(false);
        }).catch((error)=>{
            setError("Can't update sport!");
        })
    }

    useEffect(()=>{
        axios.get(SPORT_CATEGORY_API, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setListSport(response.data.data);
        }).catch(error=>{
            console.log(error);
        })
    }, [null])

    return (
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Sport" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <p>{error}</p>
                <select value={value} onChange={(event)=>{setValue(event.target.value)}}>
                    {listSport.map((element, key)=>{
                        return (
                            <option key={key} value={element.name}>{element.name}</option>
                        )
                    })}
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{props.setShow(false)}}><FormattedMessage id="Close" /></Button>
                <Button variant="primary" onClick={()=>{handleSubmit()}}><FormattedMessage id="Save changes" /></Button>
            </Modal.Footer>
        </Modal>
    )
}