import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from './styles.module.scss';
export default function Filter(){
    const [search, setSearch] = useState();
    const [group, setGroup] = useState();
    const [sort, setSort] = useState();

    function handleGroup(event){
        let group = event.target.value;
    }

    function handleSort(event){
        let sort = event.target.value;
    }

    function handleSearch(event){
        let search = event.target.value;
    }
    return(
        <div className={styles.container}>
            <div>
                <select className={styles.group} onChange={handleGroup}>
                    <option value="all">All Friends</option>
                    <option value="new">New Friends</option>
                </select>
                <select className={styles.sort} onChange={handleSort}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <div className={styles.find}>
                <FontAwesomeIcon height={12} icon={faSearch}></FontAwesomeIcon>
                <input onChange={handleSearch} placeholder="Find a friend"></input>
            </div>
        </div>
    )
}