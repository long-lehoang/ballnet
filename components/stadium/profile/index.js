import React, { useEffect, useState } from 'react';
import { AVATAR, AVATAR_TEAM, HOST, MAP_API_KEY, STADIUM_API } from '../../../config/config';
import styles from './styles.module.scss';
import loadStar from '../../../lib/star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMessage } from '../../../slices/messageSlice';
import AddExtension from './AddExtension';
import EditInfo from './EditInfo';
import { useRouter } from 'next/dist/client/router';
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl';

const geolocateControlStyle = {
    right: 10,
    top: 10
};

export default function StadiumProfile(props) {
    const user = useSelector(state => state.infoUser);
    const permission = user.id === props.stadium.user_id || user.username === 'admin'
    const [img, setImg] = useState(props.stadium.avatar == null ? AVATAR_TEAM : HOST + props.stadium.avatar);

    const [viewport, setViewport] = useState({
        latitude: props.stadium.latitude,
        longitude: props.stadium.longitude,
        zoom: 16
    });

    const token = useSelector(state => state.token);
    const [showExtension, setShowExtension] = useState(false);
    const [extensions, setExtension] = useState(props.stadium.extensions.map(ele => ele.extension));
    const dispatch = useDispatch();
    const [name, setName] = useState(props.stadium.name);
    const [phone, setPhone] = useState(props.stadium.phone);
    const [location, setLocation] = useState(props.stadium.location);
    const [sport, setSport] = useState(props.stadium.sport);
    const [editInfo, toggleEditInfo] = useState(false);    
    const [lat, setLat] = useState(props.stadium.latitude);
    const [lng, setLng] = useState(props.stadium.longitude);
    const router = useRouter();


    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    function handleCover(event) {
        var formData = new FormData();
        formData.append('image', event.target.files[0]);

        axios.post(STADIUM_API + `${props.stadium.id}/avatar`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            let url = URL.createObjectURL(event.target.files[0]);
            setImg(url);
        }).catch((error) => {
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình thay đổi ảnh bìa.')
        });
    }

    function handleExtension() {
        setShowExtension(true);
    }

    function handleRemove() {
        axios.delete(STADIUM_API + props.stadium.id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            router.push('/stadium');
        }).catch((error) => {
            openMessageBox("Can't remove");
        });
    }

    return (

        <div className={styles.container}>
            <AddExtension show={showExtension} setExtension={setExtension} setShow={setShowExtension} stadium={props.stadium}></AddExtension>
            <EditInfo show={editInfo}
                setShow={toggleEditInfo}
                setName={setName}
                setLocation={setLocation}
                setPhone={setPhone}
                setSport={setSport}
                setLat={setLat}
                setLng={setLng}
                name={name}
                phone={phone}
                location={location}
                sport={sport}
                lat={lat}
                lng={lng}
                id={props.stadium.id}
            />
            <img className={styles.img} src={img}></img>
            {permission ? <input type="file" name="image" id="btn-change" onChange={handleCover} className={styles.btnChange}></input> : ''}
            {permission ? <label for="btn-change"><FormattedMessage id="Change" /></label> : ''}
            <div className={styles.info}>
                <div className={styles.group}>
                    <h1>
                        {name}
                        {permission ? <button onClick={() => { toggleEditInfo(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
                    </h1>
                    {permission ? <button className={styles.btnRemove} onClick={handleRemove}><FormattedMessage id="Remove" /></button> : ''}
                </div>
                <p>{loadStar(props.stadium.rating, 15)}</p>
                <h5>{sport}</h5>
                <h5>
                    {location}

                </h5>
                <h5>
                    {phone}

                </h5>
                <hr></hr>
            </div>
            <div className={styles.extension}>
                <h5><FormattedMessage id="EXTENSIONS" />
                    {permission ? <button className={styles.btnAdd} onClick={handleExtension}>+</button> : ''}
                </h5>
                {extensions.map((element, key) => {
                    return (
                        <span key={key}>
                            <FontAwesomeIcon className={styles.icon} height={15} icon={faCheckCircle}></FontAwesomeIcon>
                            {element.trim()}
                        </span>
                    )
                })}
                <hr></hr>

            </div>
            <div className={styles.map}>
                <h5><FormattedMessage id="MAP" /></h5>
                <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="95%"
                    onViewportChange={setViewport}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxApiAccessToken={MAP_API_KEY}>
                    <Marker latitude={props.stadium.latitude} longitude={props.stadium.longitude} offsetLeft={-20} offsetTop={-10}>
                        <div className={styles.marker}>
                            <p>{props.stadium.name}</p>
                            <span><FontAwesomeIcon height={20} icon={faMapMarkerAlt}></FontAwesomeIcon></span>
                        </div>
                    </Marker>
                    <GeolocateControl
                        style={geolocateControlStyle}
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                    />
                </ReactMapGL>
            </div>
            <div className={styles.booking}>

            </div>
            <div className={styles.review}>
                <h5><FormattedMessage id="REVIEWS" /></h5>
                {props.stadium.reviews.map((element, key) => {
                    return (
                        <LazyLoad className={styles.comment} key={key} placeholder="Loading...">
                            <img src={element.avatar == null ? AVATAR : HOST + element.avatar} className={styles.avatar}></img>
                            <div className={styles.content}>
                                <div className={styles.group} key={key}>
                                    <Link href={`/admin`}><a className={styles.name}>{element.name}</a></Link>
                                    <span className={styles.star}>{loadStar(element.rating, 15)}</span>
                                    <div className={styles.text}>{element.feedback}</div>
                                </div>
                            </div>
                        </LazyLoad>
                    )
                })}
            </div>
        </div >
    );

}