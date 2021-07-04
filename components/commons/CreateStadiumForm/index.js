import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles.module.scss';
import location from '../../../data/location.json';
import axios from "axios";
import { AVATAR, HOST, SPORT_CATEGORY_API, STADIUM_API } from "../../../config/config";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import GetLocation from "../GetLocation";
import { setMessage } from "../../../slices/messageSlice";
import { setLoading } from "../../../slices/loadingSlice";

export default function CreateStadiumForm({show,setShow, stadiums, setStadiums }) {
    const token = useSelector(state => state.token);
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [sport, setSport] = useState('Football');
    const [listSport, setListSport] = useState([]);
    const [nameCity, setNameCity] = useState(''); //city to submit form
    const [nameDistrict, setNameDistrict] = useState(''); //district to submit form
    const [district, setDistrict] = useState([]); // list option select district
    const [ward, setWard] = useState('');
    const [street, setStreet] = useState('');
    const profile = useSelector(state => state.profile);
    const [lat, setLat] = useState(10.7);
    const [lng, setLng] = useState(106.6);
    const [showMap, setShowMap] = useState(false);
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
        setShow(false);
        dispatch(setLoading(true));
        let formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('sport', sport);
        formData.append('location', `${street}, ${ward}, ${nameDistrict}, ${nameCity}`);
        formData.append('latitude', lat);
        formData.append('longitude', lng);
        axios.post(STADIUM_API, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setShow(false);
            let arr = JSON.parse(JSON.stringify(stadiums));
            arr.unshift(response.data.data)
            setStadiums(arr);
            dispatch(setLoading(false));
        }).catch((error) => {
            dispatch(setLoading(false));
            setShow(true);
            openMessageBox("Created failed!");
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
        <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
            <Modal.Header className={styles.header} closeButton>
                <Modal.Title className={styles.title}><FormattedMessage id="Create Stadium" /></Modal.Title>
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
                    {location.map((element,key) => {
                        return (<option key={key} value={element.Name}>{element.Name}</option>)
                    })}
                </select>
                <select value={nameDistrict} className={styles.select} onChange={handleSelectDistrict}>
                    <option>Quận/Huyện</option>
                    {district.map((element, key) => {
                        return (<option key={key} value={element.Name}>{element.Name}</option>)
                    })}
                </select>
                <input value={ward} placeholder={"Phường/Xã"} onChange={(event) => { setWard(event.target.value) }}></input>
                <input value={street} placeholder={"Số nhà"} onChange={(event) => { setStreet(event.target.value) }}></input>
                <div className={styles.btnLocate}>
                    <span><FormattedMessage id="Exact Location" /></span>
                    <button onClick={() => { setShowMap(true) }}><FontAwesomeIcon height={20} icon={faMapMarkerAlt}></FontAwesomeIcon></button>
                </div>
                <div className={styles.submit}>
                    {check ? <button className={styles.btnSubmit} onClick={handleSubmit}><FormattedMessage id="Create" /></button> :
                        <button className={styles.btnDisable}><FormattedMessage id="Create" /></button>}
                </div>
            </Modal.Body>
        </Modal>
        
    )
}