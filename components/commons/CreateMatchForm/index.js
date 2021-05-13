import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, HOST, MATCH_API, SPORT_CATEGORY_API, TYPE_SPORT_API } from '../../../config/config';
import styles from './styles.module.scss';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import location from '../../../data/location.json';
import axios from 'axios';
import { formatDateTime } from '../../../lib/time';
import { setMessage } from '../../../slices/messageSlice';
import { useRouter } from 'next/router';


export default function CreateMatchForm({team}) {
    const [show, setShow] = useState(false);
    const profile = useSelector(state=>state.profile);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [type, setType] = useState('');
    const [listType, setListType] = useState([]);
    const [permission, setPrivate] = useState('Public');
    const [districts, setDistricts] = useState([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [check, setCheck] = useState(false);
    const token = useSelector(state=>state.token);
    const dispatch = useDispatch();
    const router = useRouter();
    
    function validate()
    {        
        //type
        if(type == ''){
            return false;
        }
        //city
        if(city == ''){
            return false;
        }
        //district
        if(district == ''){
            return false;
        }
        //start
        if(start == ''){
            return false;
        }
        //end
        if(end == ''){
            return false;
        }

        return true;
    }

    function handleSubmit()
    {
        var formData = new FormData();
        formData.append('private', permission);
        formData.append('sport', team.sport);
        formData.append('type', type);
        formData.append('location', `${district}, ${city}`);
        let timeStart = formatDateTime(start),
            timeEnd = formatDateTime(end);
        formData.append('time', `${timeStart}, ${timeEnd}`);
        formData.append('team_1', router.query.teamID);
        axios.post(MATCH_API, formData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setShow(false);
        }).catch(error=>{
            openMessageBox(error.response.data.message);
        })
    }

    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }

    function selectCity(event)
    {
        const nameCity = event.target.value;
        //set options for select district
        const obj = location.find((element) => element.Name === nameCity);
        setDistricts(obj.Districts);
        setCity(nameCity);
    }

    function selectDistrict(event)
    {
        const nameDistrict = event.target.value;
        setDistrict(nameDistrict);
    }

    useEffect(()=>{
        console.log(check);
        setCheck(validate());
    })

    useEffect(()=>{
        axios.get(SPORT_CATEGORY_API + team.sport,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setListType(response.data.data);
            console.log(response.data.data);
        }).catch(error=>{
            console.log(error.response.data.message)
        })

    },[null]);

    return (
        <div className={styles.container}>
            <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
            <button className={styles.btn} onClick={() => setShow(true)}>Create Match</button>
            <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}>Create Match</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <div className={styles.group3}>
                        <div className={styles.col}>
                            <div className={styles.title}>
                                Private
                            </div>
                            <select value={permission} onChange={(event)=>{setPrivate(event.target.value)}} className={styles.input}>
                                <option>Team</option>
                                <option>Public</option>
                            </select>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.title}>
                                Sport
                            </div>
                            <select value={team.sport} className={styles.input} disabled>
                                <option value={team.sport}>{team.sport}</option>
                            </select>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.title}>
                                Type
                            </div>
                            <select value={type} onChange={(event)=>{setType(event.target.value)}} className={styles.input}>
                                <option>Select Type</option>
                                {listType.map((element, key)=>{
                                    return(
                                        <option key={key} value={element.type}>{element.type}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    
                    <div className={styles.group2}>
                        <div className={styles.col}>
                            <div className={styles.title}>
                                City
                            </div>
                            <select value={city} onChange={selectCity} className={styles.input}>
                            <option>Select City</option>
                            {location.map( element => {
                                return (<option value={element.Name}>{element.Name}</option>)
                            })}
                            </select>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.title}>
                                District
                            </div>
                            <select value={district} onChange={selectDistrict} className={styles.input}>
                            <option>Select District</option>
                            {districts.map( element => {
                                return (<option value={element.Name}>{element.Name}</option>)
                            })}
                            </select>
                        </div>
                    </div>
                    
                    <div className={styles.group}>
                        <div className={styles.col}>
                            <div className={styles.title}>
                                Start
                            </div>
                            <div className={styles.input}>
                            <DateTimePicker
                            onChange={setStart}
                            value={start}
                            format="y-MM-dd h:mm a"
                            />
                            </div>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.title}>
                                End
                            </div>
                            <div className={styles.input}>
                            <DateTimePicker
                            onChange={setEnd}
                            value={end}
                            format="y-MM-dd h:mm a"
                            />
                            </div>
                        </div>
                    </div>
                    <div className={styles.submit}>
                        {check ? <button className={styles.btnSubmit} onClick={handleSubmit}>Create</button>:
                        <button className={styles.btnDisable}>Create</button>}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}