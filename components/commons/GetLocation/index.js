import { FormattedMessage } from 'react-intl'
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss'
import { useState } from 'react';
import { MAP_API_KEY } from '../../../config/config';
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const geolocateControlStyle = {
    right: 0,
    top: 0
};

export default function GetLocation(props) {

    const [viewport, setViewport] = useState({
        latitude: props.lat,
        longitude: props.lng,
        zoom: 16
    });

    function getCoding(e) {
        props.setLng(e.lngLat[0]);
        props.setLat(e.lngLat[1]);
    }

    return (
        <Modal className={styles.modal_container} show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header className={styles.header} closeButton>
                <Modal.Title className={styles.title}><FormattedMessage id="Get Location" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="95%"
                    onViewportChange={setViewport}
                    onClick={getCoding}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxApiAccessToken={MAP_API_KEY}>

                    <Marker latitude={props.lat} longitude={props.lng} offsetLeft={0} offsetTop={0}>
                        <div className={styles.marker}>
                            <span><FontAwesomeIcon height={20} icon={faMapMarkerAlt}></FontAwesomeIcon></span>
                        </div>
                    </Marker>
                    <GeolocateControl
                        style={geolocateControlStyle}
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                    />
                </ReactMapGL>
            </Modal.Body>
        </Modal >
    )
}