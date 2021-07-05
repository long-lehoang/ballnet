import styles from './styles.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { TEAM_API } from '../../../../config/config';
import CreatePostForm from '../../../commons/CreatePostForm';
import Post from '../../../commons/Post';
import Loading from '../../../commons/Loading';
import InfiniteScroll from 'react-infinite-scroller';


export default function Feed({team}) {
    const token = useSelector(state => state.token)
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [nextUrl, setNextUrl] = useState(TEAM_API + `${team.id}/feed`);
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
            },
            cache: true
        }).then((response) => {
            let lists = posts;
            lists = lists.concat(response.data.data.data);
            setPosts(lists);
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
            <div className={styles.row}>
                <CreatePostForm team={team.id} list={posts} setList={setPosts} ></CreatePostForm>
            </div>
            <InfiniteScroll
                pageStart={1}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {posts.map((element, key) => {
                    return (
                        <LazyLoad key={element.id} height={200} placeholder={<Loading />}>
                            <Post key={element.id} post={element}></Post>
                        </LazyLoad>
                    )
                })}
            </InfiniteScroll>
            
        </div>
    )
}