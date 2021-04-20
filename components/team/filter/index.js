import styles from './styles.module.scss';
import location from '../../../data/location.json';
import { useState } from 'react';

export default function Filter({team, setTeam, result}){
    const [district, setDistrict] = useState(location[0].Districts);
    const [resultWithCity, setResultCity] = useState(team);

    function handleSearch(event){
        let search = event.target.value;
        let arr = [...team];
        let pp = arr.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setTeam(pp);
    }

    function handleSelectCity(event){
        const idCity = event.target.value;
        if(idCity === 'all'){
            setTeam(team);
            return;
        }
        //set options for select district
        const obj = location.find((element) => element.Id === idCity);
        setDistrict(obj.Districts);

        //search
        let nameCity = obj.Name;
        let arr = [...team];
        let pp = arr.filter( element => {
            if (element.location == null) return false;
            let location = element.location.split(', ');
            let city = location[location.length - 1];
            return city == nameCity;
        });
        setTeam(pp);
        setResultCity(pp);
    }

    function handleSelectDistrict(event){
        const idDistrict = event.target.value;
        if(idDistrict === 'all'){
            setTeam(resultWithCity);
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
        setTeam(pp);
    }

    return (
        <div className={styles.container}>
            <input className={styles.search} onChange={handleSearch} placeholder="Enter to find"></input>
            <select className={styles.select}>
                <option>Football</option>
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