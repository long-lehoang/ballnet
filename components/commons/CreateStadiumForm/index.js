import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles.module.scss';
import location from '../../../data/location.json';
import axios from "axios";
import { AVATAR, HOST, SPORT_CATEGORY_API, STADIUM_API } from "../../../config/config";
import { FormattedMessage } from "react-intl";

export default function CreateStadiumForm({ stadiums, setStadiums }) {
    const [show, setShow] = useState(false);
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
        return true;
    }

    function handleSubmit() {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('sport', sport);
        formData.append('location', `${street}, ${ward}, ${nameDistrict}, ${nameCity}`);

        axios.post(STADIUM_API, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setShow(false);
            let arr = JSON.parse(JSON.stringify(stadiums));
            arr.unshift(response.data.data)
            setStadiums(arr);
        }).catch((error) => {
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
        <div className={styles.container}>
            <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
            <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}><FormattedMessage id="Create Stadium" /></Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>

                    <input className={styles.fullwidth} value={name} placeholder={<FormattedMessage id="Name" />} onChange={(event) => { setName(event.target.value) }}></input>
                    <input value={phone} placeholder={<FormattedMessage id="Phone Number" />} onChange={(event) => { setPhone(event.target.value) }}></input>
                    <select value={sport} onChange={(event) => { setSport(event.target.value) }}>
                        {listSport.map((element, key) => {
                            return (
                                <option key={key} value={element.name}>{element.name}</option>
                            )
                        })}
                    </select>
                    <select value={nameCity} className={styles.select} onChange={handleSelectCity}>
                        <option><FormattedMessage id="Province/City" /></option>
                        {location.map(element => {
                            return (<option value={element.Name}>{element.Name}</option>)
                        })}
                    </select>
                    <select value={nameDistrict} className={styles.select} onChange={handleSelectDistrict}>
                        <option><FormattedMessage id="District" /></option>
                        {district.map(element => {
                            return (<option value={element.Name}>{element.Name}</option>)
                        })}
                    </select>
                    <input value={ward} placeholder={<FormattedMessage id="Ward" />} onChange={(event) => { setWard(event.target.value) }}></input>
                    <input value={street} placeholder={<FormattedMessage id="Street" />} onChange={(event) => { setStreet(event.target.value) }}></input>
                    <div className={styles.submit}>
                        {check ? <button className={styles.btnSubmit} onClick={handleSubmit}><FormattedMessage id="Create" /></button> :
                            <button className={styles.btnDisable}><FormattedMessage id="Create" /></button>}
                    </div>
                </Modal.Body>
            </Modal>
            <button className={styles.btn} onClick={() => setShow(true)}><FormattedMessage id="Create Stadium" /></button>
        </div>
    )
}