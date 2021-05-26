import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { AVATAR, HOST, TEAM_API } from '../../../../../config/config';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function EditAdmin(props) {
    const [admin, setAdmin] = useState(props.value)
    const listIds = props.value.map(element => element.id);
    const [ids, setIds] = useState(listIds);
    const listOption = props.members.filter(element => !listIds.includes(element.id))
    const optionSearch = listOption.map((member) => {
        const src = member.avatar === null ? AVATAR : HOST + member.avatar
        return {
            value: member.id,
            label: <div className={styles.option}>
                <img src={src}></img>
                <span>{member.name}</span>
            </div>
        }
    })
    useEffect(() => {
        setAdmin(props.value);
        setIds(props.value.map(element => element.id))
    }, [props.value])
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    function handleSelect(value) {
        var a = ids;
        let arrIdOption = value.map(val => val.value);
        console.log(arrIdOption);
        let arrId = ids.concat(arrIdOption);
        let admins = props.members.filter(member => arrId.includes(member.id));
        console.log(admins);
        setIds(arrId);
        setAdmin(admins);
    }

    function handleSubmit() {
        var formData = new FormData()
        formData.append('admins', ids);
        axios.post(TEAM_API + `${props.id}/admin`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            props.setValue(admin)
            props.setShow(false)
        }).catch(error => {
            openMessageBox("Can't update admin");
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title ><FormattedMessage id="Administrator" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <div className={styles.admin}>
                    {
                        admin.map((ad, key) => {
                            const src = ad.avatar === null ? AVATAR : HOST + ad.avatar
                            return (
                                <div className={styles.group} key={key}>
                                    <Link href={`/${ad.username}`}>
                                        <div className={styles.item}>
                                            <img src={src}></img>
                                            <div>
                                                <span className={styles.name}>{ad.name}</span>
                                                <span className={styles.location}>{ad.address != null ? ad.address.split(', ')[1] : 'No address'}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <button onClick={() => {
                                        let result = admin.filter(admin => admin.id !== ad.id);
                                        let arrId = ids.filter(id => id !== ad.id)
                                        setAdmin(result);
                                        setIds(arrId);
                                    }}>
                                        <FontAwesomeIcon height={15} icon={faTrash}></FontAwesomeIcon>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>

                <Select
                    options={optionSearch}
                    isMulti
                    name="colors"
                    onChange={(value) => handleSelect(value)}
                    closeMenuOnSelect={false}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </Modal.Body>
            <Modal.Footer>

                <Button variant="secondary" onClick={() => { props.setShow(false) }}><FormattedMessage id="Close" /></Button>
                <Button variant="primary" onClick={() => { handleSubmit() }}><FormattedMessage id="Save changes" /></Button>
            </Modal.Footer>
        </Modal>
    )
}