import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { AVATAR, HOST } from '../../../../../config/config';
import styles from './styles.module.scss';

export default function EditAdmin(props) {
    const [admin, setAdmin] = useState(props.value)
    const listIds = props.value.map(element=>element.id)
    const [ids, setIds] = useState(listIds);
    console.log(listIds);
    const listOption = props.members.filter(element=>!listIds.includes(element.id))
    const optionSearch = listOption.map((member)=>{
        const src = member.avatar === null ? AVATAR : HOST+member.avatar
        return {
            value: member.id,
            label: <div className={styles.option}>
                <img src={src}></img>
                <span>{member.name}</span>
                </div>
        }
    })
    function handleSelect(value){
        
        let arrIdOption = value.map(val=>val.value);
        console.log(arrIdOption);
        let arrId = ids.concat(arrIdOption);
        console.log(arrId);
        let admins = props.members.filter(member=>arrId.includes(member.id));
        console.log(admins);
        // setAdmin(admins);
    }

    function handleSubmit() {
        props.setValue(admin)
        props.setShow(false)
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title >Administrator</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <div className={styles.admin}>
                    {
                        admin.map((admin, key)=>{
                            const src = admin.avatar===null? AVATAR: HOST + admin.avatar
                            return (
                                <Link href={`/${admin.username}`}>
                                <div className={styles.item} key={key}>
                                    <img src={src}></img>
                                    <div>
                                        <span className={styles.name}>{admin.name}</span>
                                        <span className={styles.location}>{admin.address.split(', ')[1]}</span>
                                    </div>
                                </div>
                                </Link>
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
                
                <Button variant="secondary" onClick={() => { props.setShow(false) }}>Close</Button>
                <Button variant="primary" onClick={() => { handleSubmit() }}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}