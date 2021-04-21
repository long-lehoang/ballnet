import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';

function compare(a, b){
    if (a.created_at < b.created_at){
        return -1;
    }else if (a.created_at > b.created_at){
        return 1;
    }else{
        return 0;
    }
}

export default function Filter({friends, setFriend, result}){

    function handleGroup(event){
        let group = event.target.value;
        let now = new Date();
        if(group === 'new'){
            let fr = result.filter( element => {
                return (now.getTime() - (new Date(element.created_at)).getTime()) < 2592000000;
            });
            setFriend(fr);
            return;
        }else{
            setFriend(friends);
            return;
        }
        
    }

    function handleSort(event){
        let sort = event.target.value;
        let fr = [...result];
        if (sort === 'asc'){
            fr.sort(compare);
        }else{
            fr.reverse(compare);
        }
        setFriend(fr);
    }

    function handleSearch(event){
        let search = event.target.value;
        let fr = friends.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setFriend(fr);
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