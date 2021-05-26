import styles from './styles.module.scss';
import location from '../../../data/location.json';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

export default function Filter({people, setPeople, result}){
    const [district, setDistrict] = useState(location[0].Districts);
    const [resultWithCity, setResultCity] = useState(people);

    function handleSearch(event){
        let search = event.target.value;
        let arr = [...people];
        let pp = arr.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setPeople(pp);
    }

    function handleSelectCity(event){
        const idCity = event.target.value;
        if(idCity === 'all'){
            setPeople(people);
            return;
        }
        //set options for select district
        const obj = location.find((element) => element.Id === idCity);
        setDistrict(obj.Districts);

        //search
        let nameCity = obj.Name;
        let arr = [...people];
        let pp = arr.filter( element => {
            if (element.address == null) return false;
            let address = element.address.split(', ');
            let city = address[address.length - 1];
            return city == nameCity;
        });
        setPeople(pp);
        setResultCity(pp);
    }

    function handleSelectDistrict(event){
        const idDistrict = event.target.value;
        if(idDistrict === 'all'){
            setPeople(resultWithCity);
            return;
        }
        //set options for select district
        const obj = district.find((element) => element.Id === idDistrict);

        //search
        let nameDistrict = obj.Name;
        let arr = [...resultWithCity];
        let pp = arr.filter( element => {
            if (element.address == null) return false;
            let address = element.address.split(', ');
            let district = address[address.length - 2];
            return district == nameDistrict;
        });
        setPeople(pp);
    }

    return (
        <div className={styles.container}>
            <input className={styles.search} onChange={handleSearch} placeholder="Nhập để tìm kiếm"></input>
            <select className={styles.select}>
                {/* //TODO */}
                <option>Football</option>
            </select>
            <select className={styles.select} onChange={handleSelectCity}>
                <option value="all">Tỉnh/Thành phố</option>
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