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
import { FormattedMessage } from 'react-intl';
import { setLoading } from '../../../slices/loadingSlice';


export default function CreateMatchForm({show, setShow, team, matchs, setMatchs }) {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [type, setType] = useState('');
    const [listType, setListType] = useState([]);
    const [permission, setPrivate] = useState('Public');
    const [districts, setDistricts] = useState([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [check, setCheck] = useState(false);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    function validate() {
        //type
        if (type == '') {
            return false;
        }
        //city
        if (city == '') {
            return false;
        }
        //district
        if (district == '') {
            return false;
        }
        //start
        if (start == '') {
            return false;
        }
        //end
        if (end == '') {
            return false;
        }

        return true;
    }

    function handleSubmit() {
        setShow(false);
        dispatch(setLoading(true))
        var formData = new FormData();
        formData.append('private', permission);
        formData.append('sport', team.sport);
        formData.append('type', type);
        formData.append('location', `${district}, ${city}`);
        let timeStart = formatDateTime(start),
            timeEnd = formatDateTime(end);
        formData.append('time', `${timeStart}, ${timeEnd}`);
        formData.append('team_1', team.id);
        axios.post(MATCH_API, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            let arr = JSON.parse(JSON.stringify(matchs));
            arr.unshift(response.data.data)
            setMatchs(arr);
            dispatch(setLoading(false));
        }).catch(error => {
            setShow(true);
            dispatch(setLoading(false));
            openMessageBox(error.response.data.message);
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    function selectCity(event) {
        const nameCity = event.target.value;
        //set options for select district
        const obj = location.find((element) => element.Name === nameCity);
        setDistricts(obj.Districts);
        setCity(nameCity);
    }

    function selectDistrict(event) {
        const nameDistrict = event.target.value;
        setDistrict(nameDistrict);
    }

    useEffect(() => {
        setCheck(validate());
    })

    useEffect(() => {
        axios.get(SPORT_CATEGORY_API + team.sport, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setListType(response.data.data);
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })

    }, [null]);

    return (
        <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
            <Modal.Header className={styles.header} closeButton>
                <Modal.Title className={styles.title}><FormattedMessage id="Create Match" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <div className={styles.group3}>
                    <div className={styles.col}>
                        <div className={styles.title}>
                            <FormattedMessage id="Private" />
                        </div>
                        <select value={permission} onChange={(event) => { setPrivate(event.target.value) }} className={styles.input}>
                            <option value="Team">Câu lạc bộ</option>
                            <option value="Public">Công khai</option>
                        </select>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.title}>
                        <FormattedMessage id="Sport" />
                        </div>
                        <select value={team.sport} className={styles.input} disabled>
                            <option value={team.sport}>{team.sport}</option>
                        </select>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.title}>
                        <FormattedMessage id="Type" />
                        </div>
                        <select value={type} onChange={(event) => { setType(event.target.value) }} className={styles.input}>
                            <option>Chọn loại</option>
                            {listType.map((element, key) => {
                                return (
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
                            {location.map((element,key) => {
                                return (<option key={key} value={element.Name}>{element.Name}</option>)
                            })}
                        </select>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.title}>
                        <FormattedMessage id="District" />
                        </div>
                        <select value={district} onChange={selectDistrict} className={styles.input}>
                            <option>Chọn quận/huyện</option>
                            {districts.map((element,key) => {
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
                    {check ? <button className={styles.btnSubmit} onClick={handleSubmit}><FormattedMessage id="Create" /></button> :
                        <button className={styles.btnDisable}><FormattedMessage id="Create" /></button>}
                </div>
            </Modal.Body>
        </Modal>
    )
}