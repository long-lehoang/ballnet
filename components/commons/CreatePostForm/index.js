import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AVATAR, HOST } from '../../../config/config';
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMapMarkedAlt, faUser } from "@fortawesome/free-solid-svg-icons";

export default function CreatePostForm(){
    const [show, setShow] = useState(false);
    const [type, setType] = useState('Public');
    const [text, setText] = useState('');

    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);

    function handleSubmit(event){
        event.preventDefault();
        console.log(type);
        console.log(text);

        setShow(false);
    }
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    })

    return(
        <div className={styles.container}>
            <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar}></img>
            <Modal className={styles.modal_container} show={show} onHide={()=>setShow(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.title}>
                            <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar} width="40px" height="40px"></img>
                            <div className={styles.name}>
                                <span>{user==null ? 'No Name' : user.name}</span>
                                <select value={type} onChange={(event)=>{setType(event.target.value)}}>
                                    <option value="Only me">Only me</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Public">Public</option>
                                </select>
                            </div>    
                        </div>
                        <div className={styles.textInput}>
                            <textarea value={text} placeholder="What’s on your mind ?" onChange={(e)=>{setText(e.target.value)}}></textarea>
                        </div>
                        <div className={styles.groupButton}>
                            <span className={styles.left}>Add to your post</span>
                            <div className={styles.right}>
                                <label for="image"><FontAwesomeIcon className={styles.iconImage} icon={faImage}></FontAwesomeIcon></label>
                                <input id="image" type="file"/>
                                <label for="tag"><FontAwesomeIcon className={styles.iconTag} icon={faUser}></FontAwesomeIcon></label>
                                <input id="tag" type="button"></input>
                                <label for="location"><FontAwesomeIcon className={styles.iconLocation} icon={faMapMarkedAlt}></FontAwesomeIcon></label>
                                <input id="location" type="button"></input>
                            </div>
                        </div>
                        <button type="submit" className={styles.btnSubmit}>Post</button>
                    </form>
                </Modal.Body>
            </Modal>
            <button className={styles.btn} onClick={() => setShow(true)}>Post a status</button>
        </div>
    )
}