import { useState } from 'react';
import Filter from '../commons/Filter'
import Item from '../commons/MatchItem'
import styles from './styles.module.scss'
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import { FormattedMessage } from 'react-intl';
import SelectTeam from './SelectMyTeam';
import CreateMatchForm from '../commons/CreateMatchForm';
import { AVATAR_TEAM, HOST, MATCH_API, SEARCH_MATCH_API } from '../../config/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

export default function Match({match})
{
    const [list, setList] = useState(match||[]);
    const [team, setTeam] = useState();
    const [showSelectTeam, setShowSelectTeam] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const token = useSelector(state => state.token);
    const [hasMore, setHasMore] = useState(true);
    const [nextUrl, setNextUrl] = useState(MATCH_API + `?page=2`);
    const [wait, setWait] = useState(false);

    function loadMore(page){
        let url = ''
        if(nextUrl != null){
            url = nextUrl;
        }else{
            return false;
        }

        if(wait){
            return false;
        }
        setWait(true);

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            let lists = list;
            lists = lists.concat(response.data.data.data);
            setList(lists);
            setNextUrl(response.data.data.next_page_url);
            setWait(false);
            if(response.data.data.next_page_url == null){
                setHasMore(false);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Matches" /></h3>
            <div className={styles.filter}>
                <Filter setHasMore={setHasMore} setWait={setWait} setResult={setList} baseUrl={SEARCH_MATCH_API}  setNextUrl={setNextUrl}/>
            </div>
            
            <InfiniteScroll
                pageStart={2}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                <div className={styles.lists}>
                    <SelectTeam team={team} setTeam={setTeam} show={showSelectTeam} setShow={setShowSelectTeam} setShowCreate={setShowCreate} ></SelectTeam>
                    { team != undefined ? <CreateMatchForm show={showCreate} setShow={setShowCreate} team={team} matchs={list} setMatchs={setList}></CreateMatchForm> : ''}
                    <div className={styles.addComp} onClick={()=>setShowSelectTeam(true)}>
                        <img src={AVATAR_TEAM}></img>
                        <button>+</button>
                        <span><FormattedMessage id="Add" /></span>
                    </div>
                    {
                        list.map((item, key)=>{
                            return(
                                <LazyLoad key={item.id} height={200} placeholder={<Loading/>}>
                                    <Item item={item} key={item.id}/>
                                </LazyLoad>
                            )
                        })
                    }
                </div>
            </InfiniteScroll>
        </div>
    )
}