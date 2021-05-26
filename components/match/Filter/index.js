import styles from './styles.module.scss';
import location from '../../../data/location.json';
import { useEffect, useState } from 'react';
import { SPORT_CATEGORY_API } from '../../../config/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

export default function Filter({match, setMatch, result}){
    const [district, setDistrict] = useState(location[0].Districts);
    const [resultWithCity, setResultCity] = useState(match);
    const [sport, setSport] = useState([]);
    const token = useSelector(state=>state.token);

    function handleSearch(event){
        let search = event.target.value;
        let arr = [...match];
        let pp = arr.filter( element => {
            return element.name1.toLowerCase().includes(search.trim())||element.name2.toLowerCase().includes(search.trim());
        });
        setMatch(pp);
    }

    function handleSelectCity(event){
        const idCity = event.target.value;
        if(idCity === 'all'){
            setMatch(match);
            return;
        }
        //set options for select district
        const obj = location.find((element) => element.Id === idCity);
        setDistrict(obj.Districts);

        //search
        let nameCity = obj.Name;
        let arr = [...match];
        let pp = arr.filter( element => {
            if (element.location == null) return false;
            let address = element.location.split(', ');
            let city = address[1];
            return city == nameCity;
        });
        setMatch(pp);
        setResultCity(pp);
    }

    function handleSelectDistrict(event){
        const idDistrict = event.target.value;
        if(idDistrict === 'all'){
            setMatch(resultWithCity);
            return;
        }
        //set options for select district
        const obj = district.find((element) => element.Id === idDistrict);

        //search
        let nameDistrict = obj.Name;
        let arr = [...resultWithCity];
        let pp = arr.filter( element => {
            if (element.location == null) return false;
            let address = element.location.split(', ');
            let district = address[0];
            return district == nameDistrict;
        });
        setMatch(pp);
    }

    function handleSport(event)
    {
        const sport = event.target.value;
        if(sport == 'all'){
            setMatch(match);
            return;
        }
        let arr = [...match];
        let pp = arr.filter( element => {
            return element.sport == sport;
        });
        setMatch(pp);
    }

    useEffect(()=>{
        axios.get(SPORT_CATEGORY_API,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setSport(response.data.data);
        }).catch(error=>{
            console.log(error.response.data.message);
        })

    },[null]);

    return (
        <div className={styles.container}>
            <input className={styles.search} onChange={handleSearch} placeholder="Enter to find"></input>
            <select className={styles.select} onChange={handleSport}>
                <option value="all"><FormattedMessage id="Sport" /></option>
                {sport.map(element=>{
                    return (<option value={element.name}>{element.name}</option>)
                })}
            </select>
            <select className={styles.select} onChange={handleSelectCity}>
                <option value="all"><FormattedMessage id="Province/City" /></option>
                {location.map( element => {
                    return (<option value={element.Id}>{element.Name}</option>)
                })}
            </select>
            <select className={styles.select} onChange={handleSelectDistrict}>
                <option value="all"><FormattedMessage id="District" /></option>
                {district.map( element => {
                    return (<option value={element.Id}>{element.Name}</option>)
                })}
            </select>
        </div>
    )
}