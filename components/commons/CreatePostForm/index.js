import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AVATAR, FRIENDS_API, HOST } from '../../../config/config';
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMapMarkedAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import axios from 'axios';

export default function CreatePostForm(){
    const [show, setShow] = useState(false);
    const [permission, setPermission] = useState('Public');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [showListFriends, setShowListFriends] = useState(false);
    const [optionSearch, setOptionSearch] = useState([]);
    const [preview,setPreview] = useState([]);

    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);

    const token = useSelector(state => state.token);
    
    function handleSelect(value){
        let tags = [];
        value.forEach(element => {
            tags.push(element.value);
        });
        setTags(tags);
    }

    function refreshForm(){
        setTags([]);
        setContent('');
        setImages([]);
        setLocation('');
        setPreview([]);
    }

    function handleImage(event){
        let img = images;
        let result = preview;

        for(let i=0; i<event.target.files.length ; i++){
            img.push(event.target.files[i]);
            let url = URL.createObjectURL(event.target.files[i]);
            result.push(url);
        }
        setImages(img);
        
        setPreview(result);
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(permission);
        console.log(content);
        console.log(location);
        console.log(tags);
        console.log(images);
        console.log(preview);

        refreshForm();
        // setShow(false);
    }

    //effort load suggestion friends
    useEffect(()=>{
        if(token != '')
        axios.get(FRIENDS_API,{
            headers:{
                'Authorization': token
            }
        }).then((response)=>{
            let options = [];
            response.data.data.data.forEach(element => {
                options.push({
                    value: element.id,
                    label: element.name
                });
            });
            // console.log(options);
            setOptionSearch(options);
        });
    },[token]);

    // useEffect(()=>{
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         console.log("Latitude is :", position.coords.latitude);
    //         console.log("Longitude is :", position.coords.longitude);
    //     });
    // })

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
                                <select value={permission} onChange={(event)=>{setPermission(event.target.value)}}>
                                    <option value="Only me">Only me</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Public">Public</option>
                                </select>
                            </div>    
                        </div>
                        <div className={styles.textInput}>
                            <textarea value={content} placeholder="What’s on your mind ?" onChange={(e)=>{setContent(e.target.value)}}></textarea>
                        </div>
                        <div className={styles.groupPreview}>
                            {preview.map(element =>{
                                return(
                                    <img src={element} key={Math.floor(Math.random() * 100)} width={(100/preview.length)+"%"} />
                                )
                            })}
                        </div>
                        <div className={styles.groupButton}>
                            <span className={styles.left}>Add to your post</span>
                            <div className={styles.right}>
                                <label for="image"><FontAwesomeIcon className={styles.iconImage} icon={faImage}></FontAwesomeIcon></label>
                                <input id="image" type="file" multiple onChange={handleImage}/>
                                <label for="tag"><FontAwesomeIcon className={styles.iconTag} icon={faUser}></FontAwesomeIcon></label>
                                <input id="tag" type="button" onClick={()=>setShowListFriends(true)}></input>
                                <label for="location"><FontAwesomeIcon className={styles.iconLocation} icon={faMapMarkedAlt}></FontAwesomeIcon></label>
                                <input id="location" type="button"></input>
                            </div>
                        </div>
                        <button type="submit" className={styles.btnSubmit}>Post</button>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal className={styles.modal_container} show={showListFriends} onHide={()=>setShowListFriends(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}>Tag Friends</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <Select
                        options={optionSearch}
                        isMulti
                        name="colors"
                        onChange={(value)=>handleSelect(value)}
                        closeMenuOnSelect={false}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </Modal.Body>
            </Modal>
            <button className={styles.btn} onClick={() => setShow(true)}>Post a status</button>
        </div>
    )
}