import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { MAP_API_KEY } from '../../../config/config';
import styles from './styles.module.scss';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class StadiumProfile extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1>{this.props.stadium.name}</h1>
                </div>
                <div className={styles.map}>

                    <Map
                        google={this.props.google}
                        zoom={14}
                        style={mapStyles}
                        initialCenter={
                            {
                                lat: -1.2884,
                                lng: 36.8233
                            }
                        }>
                        <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                                <h1>{this.props.stadium.name}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
                <div className={styles.booking}>

                </div>
                <div className={styles.review}>

                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (MAP_API_KEY),
})(StadiumProfile);