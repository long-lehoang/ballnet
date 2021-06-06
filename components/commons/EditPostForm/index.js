import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AVATAR, FRIENDS_API, HOST, MAP_API_KEY, POSTS_API } from '../../../config/config';
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMapMarkedAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { setMessage } from '../../../slices/messageSlice';
import { setLoading } from '../../../slices/loadingSlice';
import { validateFile } from '../../../lib/image';

export default function EditPostForm(props) {
    const [permission, setPermission] = useState(props.permission);
    const [content, setContent] = useState(props.content);
    const [location, setLocation] = useState(props.location);
    const [tags, setTags] = useState(props.tags.map(element=>element.id));
    const [images, setImages] = useState([]);
    const [showListFriends, setShowListFriends] = useState(false);
    const [optionSearch, setOptionSearch] = useState([]);
    const [preview, setPreview] = useState([]);
    const [option, setOption] = useState([]);
    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);
    const token = useSelector(state => state.token);
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();

    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }

    function handleSelect(value) {
        let tags = [];
        value.forEach(element => {
            tags.push(element.value);
        });
        setTags(tags);
    }

    function refreshForm() {
        setTags([]);
        setContent('');
        setImages([]);
        setLocation('');
        setPreview([]);
    }

    function handleImage(event) {
        if(!validateFile(event.target)){
            return false;
        }
        let img = images;
        let result = [...preview];
        for (let i = 0; i < event.target.files.length; i++) {
            img.push(event.target.files[i]);
            let url = URL.createObjectURL(event.target.files[i]);
            result.push(url);
        }
        setImages(img);

        setPreview(result);
    }
    function getLocate() {
        navigator.geolocation.getCurrentPosition(function (position) {
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${MAP_API_KEY}`).then(response => {
                setLocation(response.data.features[3].place_name);
            })
        });
    }
    function findName(id) {
        let result = option.filter(element => element.id == id)
        if(result.length == 0)
        return '';
        return result[0].name;
    }
    
    function validate() {
        if (content == '') {
            return false;
        }
        return true;
    }

    function handleSubmit(event) {
        props.setShow(false);
        dispatch(setLoading(true));
        event.preventDefault();
        var formData = new FormData();
        formData.append('private', permission);
        formData.append('content', content);
        formData.append('location', location);
        formData.append('tags', tags);

        for (let i = 0; i < images.length; i++) {
            formData.append(`images[${i}]`, images[i])
        }

        axios.post(POSTS_API + props.id, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response=>{
            props.setContent(content);
            props.setPermission(permission);
            props.setLocation(location);
            props.setTags(option.filter(element=>tags.includes(element.id)));
            props.setImages(response.data.data);
            refreshForm();
            dispatch(setLoading(false));
        }).catch(error=>{
            props.setShow(true);
            dispatch(setLoading(false));
            openMessageBox(error.response.data.message);
        });
    }
    useEffect(() => {
        setCheck(validate());
    })
    //effort load suggestion friends
    useEffect(() => {

        axios.get(FRIENDS_API, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            let options = [];
            response.data.data.forEach(element => {
                options.push({
                    value: element.id,
                    label: element.name
                });
            });
            setOption(response.data.data);
            setOptionSearch(options);
        });
    }, [null]);

    return (
        <div>
            <Modal className={styles.modal_container} show={props.show} onHide={() => props.setShow(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}><FormattedMessage id="Edit Post" /></Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.title}>
                            <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar} width="40px" height="40px"></img>
                            <div className={styles.name}>
                                <div>
                                    {user.name}
                                    {location !== '' ? <span> <FormattedMessage id="is at" /> {location}</span> : ''}
                                    {tags.length > 0 ? <span> <FormattedMessage id="is stay with" /> {tags.map(element => findName(element)).join(', ')} </span> : ''}
                                </div>
                                {permission !== 'Team' ?
                                    <select value={permission} onChange={(event) => { setPermission(event.target.value) }}>
                                        <option value="Only me">Chỉ mình tôi</option>
                                        <option value="Friend">Bạn bè</option>
                                        <option value="Public">Công khai</option>
                                    </select> : ''}
                            </div>
                        </div>
                        <div className={styles.textInput}>
                            <textarea value={content} placeholder="Bạn đang nghĩ gì?" onChange={(e) => { setContent(e.target.value) }}></textarea>
                        </div>
                        <div className={styles.groupPreview}>
                            {preview.map((element,key) => {
                                return (
                                    <img key={key} src={element} width={(100 / preview.length) + "%"} />
                                )
                            })}
                        </div>
                        <div className={styles.groupButton}>
                            <span className={styles.left}><FormattedMessage id="Add to your post" /></span>
                            <div className={styles.right}>
                                <label for="image"><FontAwesomeIcon className={styles.iconImage} icon={faImage}></FontAwesomeIcon></label>
                                <input id="image" type="file" multiple accept=".jpg, .png, .jpeg" onChange={(event) => handleImage(event)} />
                                <label for="tag"><FontAwesomeIcon className={styles.iconTag} icon={faUser}></FontAwesomeIcon></label>
                                <input id="tag" type="button" onClick={() => setShowListFriends(true)}></input>
                                <label for="location"><FontAwesomeIcon className={styles.iconLocation} icon={faMapMarkedAlt}></FontAwesomeIcon></label>
                                <input id="location" onClick={getLocate} type="button"></input>
                            </div>
                        </div>
                        {check ? <button type="submit" className={styles.btnSubmit}><FormattedMessage id="Edit" /></button> :
                            <button type="submit" disabled className={styles.btnDisable}><FormattedMessage id="Edit" /></button>}

                    </form>
                </Modal.Body>
            </Modal>
            <Modal className={styles.modal_container} show={showListFriends} onHide={() => setShowListFriends(false)}>
                <Modal.Header className={styles.header} closeButton>
                    <Modal.Title className={styles.title}><FormattedMessage id="Tag Friends" /></Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
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
            </Modal>
        </div>
    )
}