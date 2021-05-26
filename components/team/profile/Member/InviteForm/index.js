import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Item from './Item';
import styles from './styles.module.scss';

export default function InviteForm({ friends }) {
    const [show, setShow] = useState(false);
    const [list, setList] = useState(friends)
    function handleSearch(event){
        let search = event.target.value;
        let fr = friends.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setList(fr);
    }

    return (
        <div>
            <button className={styles.btn_show} onClick={() => setShow(true)}><FormattedMessage id="Invite to Join Team" /></button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title ><FormattedMessage id="Invite to Join Team" /></Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <input className={styles.search} placeholder={<FormattedMessage id="Search Friends" />} onChange={handleSearch}></input>
                    <div className={styles.list}>
                        {list.map((element, key) => {
                            return (
                                // <LazyLoad key={key} height={10} placeholder={<Loading/>}>                        
                                < Item key={key} id={element.id} name={element.name} username={element.username} avatar={element.avatar} ></Item>
                                // </LazyLoad>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}