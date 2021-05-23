import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SPORT_CATEGORY_API, STADIUM_API } from '../../../../config/config';
import { setMessage } from '../../../../slices/messageSlice';
import styles from './styles.module.scss';
import location from '../../../../data/location.json';
import QueryString from 'qs';

export default function EditInfo(props) {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const [name, setName] = useState(props.name);
    const [phone, setPhone] = useState(props.phone);
    const [sport, setSport] = useState(props.sport);
    const address = props.location == null ? [] : props.location.split(', ');
    const [listSport, setListSport] = useState([]);

    const [nameCity, setNameCity] = useState(address[address.length - 1]); //city to submit form
    const [nameDistrict, setNameDistrict] = useState(address[address.length - 2]); //district to submit form

    const defaultDistrict = location.find(element => element.Name === address[address.length - 1])
    const [district, setDistrict] = useState(defaultDistrict == null ? [] : defaultDistrict.Districts); // list option select district
    const [ward, setWard] = useState(address[address.length - 3]);
    const [street, setStreet] = useState(address[address.length - 4]);
    function handleSelectCity(event) {
        let search = event.target.value;

        //get options for district
        const obj = location.find(element => element.Name === search)

        setDistrict(obj.Districts);

        //set value
        setNameCity(obj.Name);
    }

    function handleSelectDistrict(event) {
        let search = event.target.value;

        //get options for district
        const obj = district.find(element => element.Name === search)

        //set value
        setNameDistrict(obj.Name);

    }

    function handleSubmit() {

        let formData = QueryString.stringify({
            name: name,
            phone: phone,
            sport: sport,
            location: `${street}, ${ward}, ${nameDistrict}, ${nameCity}`
        })

        axios.put(STADIUM_API + props.id, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            props.setName(name);
            props.setPhone(phone);
            props.setLocation(`${street}, ${ward}, ${nameDistrict}, ${nameCity}`);
            props.setSport(sport);
            props.setShow(false);
        }).catch((error) => {
            openMessageBox("Update failed!");
        })

    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    useEffect(()=>{
        axios.get(SPORT_CATEGORY_API, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setListSport(response.data.data);
        }).catch(error=>{
            console.log(error.response.data.message);
        })
    }, [null])

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title >Stadium</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                
                <input className={styles.fullwidth} value={name} placeholder="Name" onChange={(event) => { setName(event.target.value) }}></input>
                <input value={phone} placeholder="Phone" onChange={(event) => { setPhone(event.target.value) }}></input>
                <select value={sport} onChange={(event)=>{setSport(event.target.value)}}>
                    {listSport.map((element, key)=>{
                        return (
                            <option key={key} value={element.name}>{element.name}</option>
                        )
                    })}
                </select>
                <select value={nameCity} className={styles.select} onChange={handleSelectCity}>
                    <option>Tỉnh/Thành Phố</option>
                    {location.map(element => {
                        return (<option value={element.Name}>{element.Name}</option>)
                    })}
                </select>
                <select value={nameDistrict} className={styles.select} onChange={handleSelectDistrict}>
                    <option>Quận/ Huyện</option>
                    {district.map(element => {
                        return (<option value={element.Name}>{element.Name}</option>)
                    })}
                </select>
                <input value={ward} placeholder="Ward" onChange={(event) => { setWard(event.target.value) }}></input>
                <input value={street} placeholder="Street" onChange={(event) => { setStreet(event.target.value) }}></input>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.setShow(false) }}>Close</Button>
                <Button variant="primary" onClick={() => { handleSubmit() }}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}