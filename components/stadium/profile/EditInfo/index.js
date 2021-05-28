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
import { FormattedMessage } from 'react-intl';
import GetLocation from '../../../commons/GetLocation';

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
    const [lat, setLat] = useState(props.lat);
    const [lng, setLng] = useState(props.lng);
    const [showMap, setShowMap] = useState(false);
    const [check, setCheck] = useState(false);

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
    function validate() {
        if (name == '') {
            return false;
        }
        if (phone == '') {
            return false;
        }
        if (sport == '') {
            return false;
        }
        if (nameCity == '') {
            return false;
        }

        if (nameDistrict == '') {
            return false;
        }
        if (ward == '') {
            return false;
        }
        if (street == '') {
            return false;
        }
        if (lat == 0) {
            return false;
        }
        if (lng == 0) {
            return false;
        }
        return true;
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
            props.setLat(lat);
            props.setLng(lng);
        }).catch((error) => {
            openMessageBox("Update failed!");
        })

    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }
    useEffect(() => {
        setCheck(validate());
    })
    useEffect(() => {
        axios.get(SPORT_CATEGORY_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setListSport(response.data.data);
        }).catch(error => {
            console.log(error.response.data.message);
        })
    }, [null])

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Stadium" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <GetLocation show={showMap} setShow={setShowMap} lat={lat} setLat={setLat} lng={lng} setLng={setLng} ></GetLocation>

                <input className={styles.fullwidth} value={name} placeholder={"Tên"} onChange={(event) => { setName(event.target.value) }}></input>
                <input value={phone} placeholder={"Số điện thoại"} onChange={(event) => { setPhone(event.target.value) }}></input>
                <select value={sport} onChange={(event) => { setSport(event.target.value) }}>
                    {listSport.map((element, key) => {
                        return (
                            <option key={key} value={element.name}>{element.name}</option>
                        )
                    })}
                </select>
                <select value={nameCity} className={styles.select} onChange={handleSelectCity}>
                    <option>Tỉnh/Thành phố</option>
                    {location.map((element, key) => {
                        return (<option key={key} value={element.Name}>{element.Name}</option>)
                    })}
                </select>
                <select value={nameDistrict} className={styles.select} onChange={handleSelectDistrict}>
                    <option>Quận/Huyện</option>
                    {district.map((element, key) => {
                        return (<option key={key} value={element.Name}>{element.Name}</option>)
                    })}
                </select>
                <input value={ward} placeholder="Phường/Xã" onChange={(event) => { setWard(event.target.value) }}></input>
                <input value={street} placeholder="Số nhà" onChange={(event) => { setStreet(event.target.value) }}></input>
                <div className={styles.btnLocate}>
                    <span><FormattedMessage id="Exact Location" /></span>
                    <button onClick={() => { setShowMap(true) }}><FontAwesomeIcon height={20} icon={faMapMarkerAlt}></FontAwesomeIcon></button>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.setShow(false) }}><FormattedMessage id="Close" /></Button>
                {check ? <Button variant="primary" onClick={() => { handleSubmit() }}><FormattedMessage id="Save changes" /></Button> :
                <Button variant="secondary"><FormattedMessage id="Save changes" /></Button>}
            </Modal.Footer>
        </Modal>
    )
}