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

function extractData(data, result = []) {
    if (Array.isArray(data))
        data.forEach(element => {
            if (Array.isArray(element))
                element.forEach(subele => {
                    result.push(subele);
                });
            else result.push(element);
        });
    else result.push(data);
    return result;
}

export default function Feed({user_id, permission}) {
    const token = useSelector(state => state.token)
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.get(PROFILE_API + `post/${user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setPosts(extractData(response.data.data).sort(function (a, b) {
                let time1 = new Date(a.updated_at);
                let time2 = new Date(b.updated_at);
    
                return time2 - time1;
            }));
        }).catch((error) => {
            console.log(error);
        })

    },[null])

    return (
        <div className={styles.container}>
            {permission ? <div className={styles.row}>
                <CreatePostForm list={posts} setList={setPosts} ></CreatePostForm>
            </div> : ''}
            {posts.map((element, key) => {
                return (
                    <LazyLoad key={element.id} height={200} placeholder={<Loading />}>
                        <Post key={element.id} post={element}></Post>
                    </LazyLoad>
                )
            })}
        </div>
    )
}