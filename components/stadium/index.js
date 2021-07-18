import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { AVATAR_TEAM, SEARCH_STADIUM_API, STADIUM_API } from '../../config/config';
import CreateStadiumForm from '../commons/CreateStadiumForm';
import Loading from '../commons/Loading';
import InfiniteScroll from 'react-infinite-scroller';
import Item from '../commons/Stadium';
import Filter from '../commons/Filter'
import styles from './styles.module.scss'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Stadium({stadium})
{
    const [list, setList] = useState(stadium||[]);
    const [show, setShow] = useState(false);
    const token = useSelector(state => state.token);
    const [hasMore, setHasMore] = useState(true);
    const [nextUrl, setNextUrl] = useState(STADIUM_API + '?page=2');
    const [wait, setWait] = useState(false);

    function loadMore(page){
        let url = ''
        if(nextUrl != null){
            url = nextUrl;
        }else{
            setHasMore(false);
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
            let page = parseInt(response.config.url.split("page=")[1][0]);
            lists = lists.concat(response.data.data.data);
            setList(lists);
            if(response.data.data.next_page_url == null){
                setHasMore(false);
                setNextUrl(null);
            }else{
                page = page + 1;
                let url = response.config.url
                url = url.replace(/page=./, `page=${page}`);
                setNextUrl(url);
                setHasMore(true);
            }
            setWait(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Stadiums" /></h3>

            <div className={styles.filter}>
                <Filter setHasMore={setHasMore} setWait={setWait} setResult={setList} baseUrl={SEARCH_STADIUM_API}  setNextUrl={setNextUrl}/>
            </div>
            <InfiniteScroll
                pageStart={2}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                <div className={styles.lists}>
                    <CreateStadiumForm show={show} setShow={setShow} stadiums={list} setStadiums={setList}></CreateStadiumForm>
                    <div className={styles.addComp} onClick={()=>setShow(true)}>
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