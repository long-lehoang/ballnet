import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import Filter from '../commons/Filter'
import Item from './Item'
import InfiniteScroll from 'react-infinite-scroller';
import styles from './styles.module.scss'
import { PEOPLE_API, SEARCH_PEOPLE_API } from '../../config/config';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function People({people})
{
    const [list, setList] = useState(people||[]);
    const token = useSelector(state => state.token);
    const [hasMore, setHasMore] = useState(true);
    const [nextUrl, setNextUrl] = useState(PEOPLE_API + '?page=2');
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
            lists = lists.concat(response.data.data);
            setList(lists);
            if(response.data.data.length == 0){
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
            <h3><FormattedMessage id="People" /></h3>
            <div className={styles.filter}>
                <Filter setHasMore={setHasMore} setWait={setWait} setResult={setList} baseUrl={SEARCH_PEOPLE_API}  setNextUrl={setNextUrl}/>
            </div>
            <InfiniteScroll
                pageStart={2}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                <div className={styles.lists}>
                    
                    {
                        list.map((item, key)=>{
                            return(
                                <LazyLoad key={key} height={200} placeholder={<Loading/>}>
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