import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import location from '../../../../../data/location.json';
import { TEAM_API } from '../../../../../config/config';
import { FormattedMessage } from 'react-intl';

export default function EditLocation(props) {
    const [error, setError] = useState();

    const address = props.value == null ? [] : props.value.split(', ');

    const [nameCity, setNameCity] = useState(address[address.length - 1]); //city to submit form
    const [nameDistrict, setNameDistrict] = useState(address[address.length - 2]); //district to submit form

    const defaultDistrict = location.find(element => element.Name === address[address.length - 1])
    const [district, setDistrict] = useState(defaultDistrict == null ? [] : defaultDistrict.Districts); // list option select district

    const token = useSelector(state => state.token);

    function handleSelectCity(event) {
        let search = event.target.value;

        //get options for district
        const obj = location.find( element => element.Name === search)
        
        setDistrict(obj.Districts);
        
        //set value
        setNameCity(obj.Name);
    }
    
    function handleSelectDistrict(event) {
        let search = event.target.value;

        //get options for district
        const obj = district.find( element => element.Name === search)
        
        //set value
        setNameDistrict(obj.Name);

    }

    function handleSubmit() {
        var formData = new FormData();
        formData.append('location', `${nameDistrict}, ${nameCity}`);
        axios.post(TEAM_API + `${props.id}/location`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            props.setValue(`${nameDistrict}, ${nameCity}`);
            setError("");
            props.setShow(false);
        }).catch((error) => {
            setError("Can't update!");
        })
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Location" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <p>{error}</p>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.setShow(false) }}><FormattedMessage id="Close" /></Button>
                <Button variant="primary" onClick={() => { handleSubmit() }}><FormattedMessage id="Save changes" /></Button>
            </Modal.Footer>
        </Modal>
    )
}