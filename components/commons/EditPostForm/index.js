import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AVATAR, FRIENDS_API, HOST, POSTS_API } from '../../../config/config';
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMapMarkedAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import axios from 'axios';

export default function EditPostForm(props){
    const [permission, setPermission] = useState(props.permission);
    const [content, setContent] = useState(props.content);
    const [location, setLocation] = useState(props.location);
    const [tags, setTags] = useState(props.tags);
    const [images, setImages] = useState(props.images);
    const [showListFriends, setShowListFriends] = useState(false);
    const [optionSearch, setOptionSearch] = useState([]);
    const [preview,setPreview] = useState([]);

    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);

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
        console.log(event.target.files);
        for(let i=0; i<event.target.files.length ; i++){
            img.push(event.target.files[i]);
            let url = URL.createObjectURL(event.target.files[i]);
            result.push(url);
        }
        setImages(img);
        
        setPreview(result);
    }

    function handleSubmit(event){
        const token = localStorage.getItem('access_token');

        event.preventDefault();
        var formData = new FormData();
        formData.append('private',permission);
        formData.append('content',content);
        formData.append('location',location);
        formData.append('tags',tags);

        for (let i = 0; i < images.length; i++) {
            formData.append(`images[${i}]`, images[i])
        }
        
        axios.post(POSTS_API+props.id,formData,{
            headers:{
                'Authorization': token
            }
        });
        refreshForm();
        props.setShow(false);
    }

    //effort load suggestion friends
    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        
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
    },[null]);

    return(
        <div>
            <Modal className={styles.modal_container} show={props.show} onHide={()=>props.setShow(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}>Edit Post</Modal.Title>
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
                                    <img src={element} width={(100/preview.length)+"%"} />
                                )
                            })}
                        </div>
                        <div className={styles.groupButton}>
                            <span className={styles.left}>Add to your post</span>
                            <div className={styles.right}>
                                <label for="image"><FontAwesomeIcon className={styles.iconImage} icon={faImage}></FontAwesomeIcon></label>
                                <input id="image" type="file" multiple onChange={(event)=>handleImage(event)}/>
                                <label for="tag"><FontAwesomeIcon className={styles.iconTag} icon={faUser}></FontAwesomeIcon></label>
                                <input id="tag" type="button" onClick={()=>setShowListFriends(true)}></input>
                                <label for="location"><FontAwesomeIcon className={styles.iconLocation} icon={faMapMarkedAlt}></FontAwesomeIcon></label>
                                <input id="location" type="button"></input>
                            </div>
                        </div>
                        <button type="submit" className={styles.btnSubmit}>Edit</button>
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
        </div>
    )
}