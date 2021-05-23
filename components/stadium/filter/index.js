import styles from './styles.module.scss';
import location from '../../../data/location.json';
import { useEffect, useState } from 'react';
import { SPORT_CATEGORY_API } from '../../../config/config';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Filter({stadium, setStadium, result}){
    const [district, setDistrict] = useState(location[0].Districts);
    const [resultWithCity, setResultCity] = useState(stadium);
    const [sport, setSport] = useState([]);
    const token = useSelector(state=>state.token);

    function handleSearch(event){
        let search = event.target.value;
        let arr = [...stadium];
        let pp = arr.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setStadium(pp);
    }

    function handleSelectCity(event){
        const idCity = event.target.value;
        if(idCity === 'all'){
            setStadium(stadium);
            return;
        }
        //set options for select district
        const obj = location.find((element) => element.Id === idCity);
        setDistrict(obj.Districts);

        //search
        let nameCity = obj.Name;
        let arr = [...stadium];
        let pp = arr.filter( element => {
            if (element.location == null) return false;
            let location = element.location.split(', ');
            let city = location[location.length - 1];
            return city == nameCity;
        });
        setStadium(pp);
        setResultCity(pp);
    }

    function handleSelectDistrict(event){
        const idDistrict = event.target.value;
        if(idDistrict === 'all'){
            setStadium(resultWithCity);
            return;
        }
        //set options for select district
        const obj = district.find((element) => element.Id === idDistrict);

        //search
        let nameDistrict = obj.Name;
        let arr = [...resultWithCity];
        let pp = arr.filter( element => {
            if (element.location == null) return false;
            let location = element.location.split(', ');
            let district = location[location.length - 2];
            return district == nameDistrict;
        });
        setStadium(pp);
    }

    function handleSport(event)
    {
        const sport = event.target.value;
        if(sport == 'all'){
            setStadium(stadium);
            return;
        }
        let arr = [...stadium];
        let pp = arr.filter( element => {
            return element.sport == sport;
        });
        setStadium(pp);
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
                <option value="all">Sport</option>
                {sport.map(element=>{
                    return (<option value={element.name}>{element.name}</option>)
                })}
            </select>
            <select className={styles.select} onChange={handleSelectCity}>
                <option value="all">Tỉnh/Thành Phố</option>
                {location.map( element => {
                    return (<option value={element.Id}>{element.Name}</option>)
                })}
            </select>
            <select className={styles.select} onChange={handleSelectDistrict}>
                <option value="all">Quận/Huyện</option>
                {district.map( element => {
                    return (<option value={element.Id}>{element.Name}</option>)
                })}
            </select>
        </div>
    )
}