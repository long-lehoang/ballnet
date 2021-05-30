import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';

function compareTime(a, b){
    if (a.joinedDate < b.joinedDate){
        return -1;
    }else if (a.joinedDate > b.joinedDate){
        return 1;
    }else{
        return 0;
    }
}
function compareMatch(a ,b){
    if (a.num_match < b.num_match){
        return 1;
    }else if (a.num_match > b.num_match){
        return -1;
    }else{
        return 0;
    }
}
export default function Filter({members, setMember, result}){

    function handleGroup(event){
        let group = event.target.value;
        let now = new Date();
        if(group === 'new'){
            let fr = members.filter( element => {
                return (now.getTime() - (new Date(element.joinedDate)).getTime()) < 2592000000;
            });
            setMember(fr);
            return;
        }else if(group === '10'){
            let fr = members.sort(compareMatch).slice(0,10);
            setMember(fr);
        }else{
            setMember(members);
            return;
        }
        
    }

    function handleSort(event){
        let sort = event.target.value;
        let fr = [...result];
        if (sort === 'asc'){
            fr.sort(compareTime);
        }else{
            fr.reverse(compareTime);
        }
        setMember(fr);
    }

    function handleSearch(event){
        let search = event.target.value;
        let fr = members.filter( element => {
            return element.name.toLowerCase().includes(search.trim());
        });
        setMember(fr);
    }

    return(
        <div className={styles.container}>
            <div>
                <select className={styles.group} onChange={handleGroup}>
                    <option value="all">Tất cả</option>
                    <option value="new">Thành viên mới</option>
                    <option value="10">Top 10</option>
                </select>
                <select className={styles.sort} onChange={handleSort}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <div className={styles.find}>
                <FontAwesomeIcon height={12} icon={faSearch}></FontAwesomeIcon>
                <input onChange={handleSearch} placeholder={"Tìm bạn bè"}></input>
            </div>
        </div>
    )
}