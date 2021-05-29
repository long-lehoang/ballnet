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
import qs from 'qs';
import { FormattedMessage } from 'react-intl';
import { setLoading } from '../../../slices/loadingSlice';

export default function EditMatchForm({item, show, setShow,setParentTypeSport, setParentStart, setParentType, setParentLocation}) {
    const [start, setStart] = useState(new Date(item.time.split(', ')[0]));
    const [end, setEnd] = useState(new Date(item.time.split(', ')[1]));
    const [type, setType] = useState(item.type);
    const [listType, setListType] = useState([]);
    const [permission, setPrivate] = useState(item.private);
    const [districts, setDistricts] = useState(location.find((element) => element.Name === item.location.split(', ')[1]).Districts);
    const [city, setCity] = useState(item.location.split(', ')[1]);
    const [district, setDistrict] = useState(item.location.split(', ')[0]);
    const [check, setCheck] = useState(false);
    const token = useSelector(state=>state.token);
    const dispatch = useDispatch();
    
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
        setShow(false);
        dispatch(setLoading(true));
        let timeStart = formatDateTime(start),
            timeEnd = formatDateTime(end);
        let formData = qs.stringify({
            private: permission,
            type: type,
            location: `${district}, ${city}`,
            time: `${timeStart}, ${timeEnd}`
        })
        axios.put(MATCH_API + item.id, formData, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }).then(response=>{
            setParentType(type.split(" vs ")[0]);
            setParentLocation(`${district}, ${city}`);
            setParentStart(new Date(timeStart));
            setParentTypeSport(type);
            dispatch(setLoading(false));
        }).catch(error=>{
            dispatch(setLoading(false));
            setShow(true);

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
        console.log(nameCity);
        //set options for select district
        if(nameCity !== 'Select City'){
            const obj = location.find((element) => element.Name === nameCity);
            setDistricts(obj.Districts);
            setCity(nameCity);
        }else{
            setCity('');
            setDistricts([]);
            setDistrict('');
        }
    }

    function selectDistrict(event)
    {
        const nameDistrict = event.target.value;
        if(nameDistrict === 'Select District')
            setDistrict('');
        else
            setDistrict(nameDistrict);
    }

    function handleSelectType(event)
    {
        if(event.target.value === 'Select Type') 
        setType(''); 
        else setType(event.target.value)
    }
    
    useEffect(()=>{
        console.log(check);
        setCheck(validate());
    })

    useEffect(()=>{
        axios.get(SPORT_CATEGORY_API + item.sport,{
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
            
        <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
            <Modal.Header className={styles.header} closeButton>
                <Modal.Title className={styles.title}><FormattedMessage id="Edit Match" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <div className={styles.group3}>
                    <div className={styles.col}>
                        <div className={styles.title}>
                            <FormattedMessage id="Private" />
                        </div>
                        <select value={permission} onChange={(event)=>{setPrivate(event.target.value)}} className={styles.input}>
                            <option>Đội</option>
                            <option>Công khai</option>
                        </select>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.title}>
                        <FormattedMessage id="Sport" />
                        </div>
                        <select value={item.sport} className={styles.input} disabled>
                            <option value={item.sport}>{item.sport}</option>
                        </select>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.title}>
                        <FormattedMessage id="Type" />
                        </div>
                        <select value={type} onChange={handleSelectType} className={styles.input}>
                            <option>Chọn loại</option>
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
                        <FormattedMessage id="City" />
                        </div>
                        <select value={city} onChange={selectCity} className={styles.input}>
                        <option>Chọn thành phố</option>
                        {location.map( (element,key) => {
                            return (<option key={key} value={element.Name}>{element.Name}</option>)
                        })}
                        </select>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.title}>
                        <FormattedMessage id="District" />
                        </div>
                        <select value={district} onChange={selectDistrict} className={styles.input}>
                        <option>Chọn quận huyện</option>
                        {districts.map( (element,key) => {
                            return (<option key={key} value={element.Name}>{element.Name}</option>)
                        })}
                        </select>
                    </div>
                </div>
                
                <div className={styles.group}>
                    <div className={styles.col}>
                        <div className={styles.title}>
                        <FormattedMessage id="Start" />
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
                        <FormattedMessage id="End" />
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
                    {check ? <button className={styles.btnSubmit} onClick={handleSubmit}><FormattedMessage id="Update" /></button>:
                    <button className={styles.btnDisable}><FormattedMessage id="Update" /></button>}
                </div>
            </Modal.Body>
        </Modal>
    )
}