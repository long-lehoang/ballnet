import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AVATAR, HOST, SPORT_CATEGORY_API, TEAM_API } from '../../../config/config';
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import location from '../../../data/location.json';
import axios from 'axios';

export default function CreateTeamForm({teams, setTeams}) {
    const [districts, setDistrict] = useState([]);
    const [sportCTGR, setSportCTGR] = useState([]);
    const [name, setName] = useState('');
    const [nameDistrict, setNameDistrict] = useState(''); 
    const [nameCity, setNameCity] = useState('');
    const [sport, setSport] = useState('');

    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const profile = useSelector(state => state.profile);
    const token = useSelector(state => state.token);

    function handleName(event){
        let value = event.target.value;
        setName(value);
    }

    function handleCity(event){
        let value = event.target.value;
        setNameCity(value);

        let obj = location.find(element=>element.Name === value);
        setDistrict(obj.Districts);
    }

    function handleDistrict(event){
        let value = event.target.value;
        setNameDistrict(value);
    }

    function handleSport(event){
        let value = event.target.value;
        setSport(value);
    }

    function validate(){
        if(name === ''){
            return 'Name is required';
        }else if(nameCity === ''){
            return 'City is required';
        }else if(nameDistrict === ''){
            return 'District is required';
        }else if(sport === ''){
            return 'Sport is required';
        }else{
            return true;
        }
    }

    function resetForm(){
        setName('');
        setNameCity('');
        setNameDistrict('');
        setSport('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        let validation = validate();
        if(validation === true){
            setError('');
            var formData = new FormData();
            formData.append('name', name);
            formData.append('location', `${nameDistrict}, ${nameCity}`);
            formData.append('sport', sport);
            axios.post(TEAM_API, formData, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                resetForm();
                setShow(false);
                let arr = JSON.parse(JSON.stringify(teams));;
                arr.unshift(response.data.data)
                setTeams(arr);
            }).catch(error=>{
                console.log(error);
            })
        }else{
            console.log(validation);
            setError(validation);
        }
    }

    useEffect(()=>{
        axios.get(SPORT_CATEGORY_API,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setSportCTGR(response.data.data);
        }).catch(error=>{
            console.log(error);
        })
    },[null]);

    return (
        <div className={styles.container}>
            <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
            <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}>Create Team</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <form onSubmit={handleSubmit}>
                        <input value={name} placeholder="Name" className={styles.row} onChange={handleName}></input>
                        <div className={styles.row}>
                            <select value={nameCity} className={styles.col} onChange={handleCity}>
                                <option>Tỉnh/Thành Phố</option>
                                {location.map(element=>{
                                    return(<option value={element.Name}>{element.Name}</option>)
                                })}
                            </select>
                            <select value={nameDistrict} className={styles.col} onChange={handleDistrict}>
                                <option>Quận/Huyện</option>
                                {districts.map(element=>{
                                    return(<option value={element.Name}>{element.Name}</option>)
                                })}
                            </select>
                        </div>
                        <select value={sport} className={styles.row} onChange={handleSport}>
                            <option>Sport</option>
                            {sportCTGR.map(element=>{
                                return (<option value={element.name}>{element.name}</option>)
                            })}
                        </select>
                        <span>{error}</span>
                        <button type="submit" className={styles.btnSubmit}>Create</button>
                    </form>
                </Modal.Body>
            </Modal>

            <button className={styles.btn} onClick={() => setShow(true)}>Create a Team</button>
        </div>
    )
}