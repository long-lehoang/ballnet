import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { AVATAR, AVATAR_TEAM, HOST, MAP_API_KEY, STADIUM_API } from '../../../config/config';
import styles from './styles.module.scss';
import Geocode from "react-geocode";
import loadStar from '../../../lib/star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMessage } from '../../../slices/messageSlice';
import AddExtension from './AddExtension';
import EditInfo from './EditInfo';
import { useRouter } from 'next/dist/client/router';

const mapStyles = {
    width: '100%',
    height: '90%'
};

export function StadiumProfile(props, onMarkerClick, onInfoWindowClose) {
    const user = useSelector(state => state.infoUser);
    const permission = user.id === props.stadium.user_id || user.username === 'admin'
    const [img, setImg] = useState(props.stadium.avatar == null ? AVATAR_TEAM : HOST + props.stadium.avatar);
    const [lat, setLat] = useState(10.805095);
    const [lng, setLng] = useState(106.648346);
    const token = useSelector(state => state.token);
    const [showExtension, setShowExtension] = useState(false);
    const [extensions, setExtension] = useState(props.stadium.extensions.map(ele => ele.extension));
    const dispatch = useDispatch();
    const [name, setName] = useState(props.stadium.name);
    const [phone, setPhone] = useState(props.stadium.phone);
    const [location, setLocation] = useState(props.stadium.location);
    const [sport, setSport] = useState(props.stadium.sport);
    const [editInfo, toggleEditInfo] = useState(false);
    const router = useRouter();

    Geocode.setApiKey(MAP_API_KEY);
    // Get latitude & longitude from address.
    Geocode.fromAddress(props.stadium.location).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            setLat(lat);
            setLng(lng);
        },
        (error) => {
            console.error(error);
        }
    );

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

    function handleRemove(){
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
                name={name}
                phone={phone}
                location={location}
                sport={sport}
                id={props.stadium.id}
            />
            <img className={styles.img} src={img}></img>
            {permission ? <input type="file" name="image" id="btn-change" onChange={handleCover} className={styles.btnChange}></input> : ''}
            {permission ? <label for="btn-change">Change</label> : ''}
            <div className={styles.info}>
                <div className={styles.group}>
                    <h1>
                        {name}
                        {permission ? <button onClick={() => { toggleEditInfo(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
                    </h1>
                    {permission ? <button className={styles.btnRemove} onClick={handleRemove}>Remove</button> : ''}
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
                <h5>TIỆN ÍCH
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
                <h5>BẢN ĐỒ</h5>
                <Map
                    google={props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={
                        {
                            lat: lat,
                            lng: lng,
                        }
                    }>
                    <Marker onClick={onMarkerClick}
                        name={props.stadium.name} />

                    <InfoWindow onClose={onInfoWindowClose}>
                        <div>
                            <h1>{props.stadium.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>

            </div>
            <div className={styles.booking}>

            </div>
            <div className={styles.review}>
                <h5>REVIEW</h5>
                <div className={styles.comment}>
                    <img src={AVATAR} className={styles.avatar}></img>
                    <div className={styles.content}>
                        <div className={styles.group}>
                            <Link href={`/admin`}><a className={styles.name}>Lê Hoàng Long</a></Link>
                            <span className={styles.star}>{loadStar(5, 15)}</span>
                            <div className={styles.text}>akjs asdas dad assd assd a aa a a a a a aa a a a aa a a a a a a  a aa  a a a aaa a a a a a aa as asdas a a a a a  a a a a aa    kl kl kl k lk l k  i h hk  l kl jk kj kj jkj kj kj k dhakjdahkah adad asdas ad ad ad a da da dlkjl jl  hjk k   h hk k k hk hk jlk kjl h kh k hk kj</div>
                        </div>
                    </div>
                </div>
                {props.stadium.reviews.map(cmt => {
                    return (
                        <LazyLoad className={styles.comment} key={cmt.id} placeholder="Loading...">
                            <img src={cmt.avatar == null ? AVATAR : HOST + cmt.avatar} className={styles.avatar}></img>
                            <div className={styles.content}>
                                <div className={styles.group}>
                                    <Link href={`/${cmt.username}`}><a className={styles.name}>{cmt.name}</a></Link>
                                    <div className={styles.text}>{cmt.comment}</div>
                                </div>
                            </div>
                        </LazyLoad>
                    )
                })}
            </div>
        </div>
    );

}

export default GoogleApiWrapper({
    apiKey: (MAP_API_KEY),
})(StadiumProfile);