import styles from './styles.module.scss';
import location from '../../../data/location.json';
import { useEffect, useState } from 'react';
import { SPORT_CATEGORY_API } from '../../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { setMessage } from '../../../slices/messageSlice';
import { setLoading } from '../../../slices/loadingSlice';

export default function Filter({setHasMore, setWait, setResult, baseUrl, setNextUrl }) {
    const [districts, setDistricts] = useState(location[0].Districts);
    const [sports, setSports] = useState([]);
    const [sport, setSport] = useState('');
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');

    function handleSearch(event) {
        if (event.charCode === 13) {
            let search = event.target.value;
            let url = baseUrl + `?city=${city}&district=${district}&sport=${sport}&search=${search}`;
            dispatch(setLoading(true));
            setWait(true);

            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.data.data != undefined) {
                    setResult(response.data.data.data);
                    let url = '';
                    if (response.data.data.next_page_url != null) {
                        url = response.data.data.next_page_url + `&city=${city}&district=${district}&sport=${sport}&search=${search}`
                        setHasMore(true);
                    } else {
                        setHasMore(false);
                        url = null
                    }
                    setNextUrl(url);
                } else {
                    setResult(response.data.data);
                    if (response.data.data.length == 0) {
                        setNextUrl(null);
                        setHasMore(false);
                    } else {
                        let url = response.config.url + '&page=2'
                        console.log(url)
                        setNextUrl(url);
                        setHasMore(true);
                    }
                }
                dispatch(setLoading(false));
                setWait(false);
            }).catch(error => {
                dispatch(setLoading(false));
                console.log(error);
            })
        }
    }

    function handleSelectCity(event) {
        const idCity = event.target.value;
        if (idCity === 'all') {
            setCity('');
            return;
        }
        //set options for select district
        const obj = location.find((element) => element.Id === idCity);
        setDistricts(obj.Districts);
        setCity(obj.Name);
    }

    function handleSelectDistrict(event) {
        const idDistrict = event.target.value;
        if (idDistrict === 'all') {
            setDistrict('');
            return;
        }
        //set options for select district
        const obj = districts.find((element) => element.Id === idDistrict);
        setDistrict(obj.Name);
    }

    function handleSport(event) {
        const sport = event.target.value;
        if (sport == 'all') {
            setSport('');
            return;
        }
        setSport(sport);
    }

    useEffect(() => {
        axios.get(SPORT_CATEGORY_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setSports(response.data.data);
        }).catch(error => {
            console.log(error);
        })

    }, [null]);

    return (
        <div className={styles.container}>
            <input className={styles.search} onKeyPress={handleSearch} placeholder="Nhập để tìm kiếm"></input>
            <select className={styles.select} onChange={handleSport}>
                <option value="all">Môn thể thao</option>
                {sports.map((element, key) => {
                    return (<option key={key} value={element.name}>{element.name}</option>)
                })}
            </select>
            <select className={styles.select} onChange={handleSelectCity}>
                <option value="all">Tỉnh/Thành phố</option>
                {location.map((element, key) => {
                    return (<option key={key} value={element.Id}>{element.Name}</option>)
                })}
            </select>
            <select className={styles.select} onChange={handleSelectDistrict}>
                <option value="all">Quận/Huyện</option>
                {districts.map((element, key) => {
                    return (<option key={key} value={element.Id}>{element.Name}</option>)
                })}
            </select>
        </div>
    )
}