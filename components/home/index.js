import styles from './styles.module.scss';
import Info from './info';
import CreatePostForm from '../commons/CreatePostForm'
import Post from '../commons/Post';
import StadiumSuggest from '../commons/StadiumSuggest';
import MatchSuggest from '../commons/MatchSuggest';
import FriendSuggest from '../commons/FriendSuggest';
import FriendRequest from '../commons/FriendRequest';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import axios from 'axios';
import { POSTS_API } from '../../config/config';
import InfiniteScroll from 'react-infinite-scroller';
import { useSelector } from 'react-redux';

export default function HomePage({ posts }) {
    const [list, setList] = useState(posts);
    const token = useSelector(state => state.token);
    const [hasMore, setHasMore] = useState(true);
    const [nextUrl, setNextUrl] = useState(POSTS_API+`?page=2`);
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
    return (
        <div className={styles.container}>
            <div className={styles.col_1}>
                <div className={styles.row} >
                    <Info></Info>
                </div>
                <div className={styles.row}>
                    <StadiumSuggest></StadiumSuggest>
                </div>
                <div className={styles.row}>
                    <FriendRequest></FriendRequest>
                </div>
            </div>
            <div className={styles.col_2} >
                <div className={styles.row}>
                    <CreatePostForm list={list} setList={setList}></CreatePostForm>
                </div>
                
                <InfiniteScroll
                    pageStart={2}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {list.map((element,key) => {
                        return(
                        <LazyLoad key={element.id} height={200} placeholder={<Loading/>}>                       
                            <Post key={element.id} post={element}></Post>
                        </LazyLoad>
                        )
                    })}
                </InfiniteScroll>
            </div>
            <div className={styles.col_3}>
                <div className={styles.row}>
                    <MatchSuggest></MatchSuggest>
                </div>
                <div className={styles.row}>
                    <FriendSuggest></FriendSuggest>
                </div>
            </div>
        </div>
    )
}