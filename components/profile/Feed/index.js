import styles from './styles.module.scss';
import CreatePostForm from '../../commons/CreatePostForm'
import Post from '../../commons/Post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Loading from '../../commons/Loading';
import { HOST, POSTS_API, PROFILE_API } from '../../../config/config';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';


export default function Feed({user_id, permission}) {
    const token = useSelector(state => state.token)
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [nextUrl, setNextUrl] = useState(PROFILE_API + `post/${user_id}`);

    function loadMore(page){
        let url = ''
        if(nextUrl != null){
            url = nextUrl;
        }else{
            return false;
        }
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
            
            if(response.data.data.next_page_url == null){
                setHasMore(false);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className={styles.container}>
            {permission ? <div className={styles.row}>
                <CreatePostForm list={posts} setList={setPosts} ></CreatePostForm>
            </div> : ''}
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