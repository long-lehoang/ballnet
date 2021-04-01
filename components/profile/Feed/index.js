import styles from './styles.module.scss';
import CreatePostForm from '../../commons/CreatePostForm'
import Post from '../../commons/Post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Loading from '../../commons/Loading';
import { POSTS_API } from '../../../config/config';
import { useRouter } from 'next/router';

function extractData(data,result = []){
    if(Array.isArray(data))
    data.forEach(element => {
        if(Array.isArray(element))
        element.forEach(subele => {
            result.push(subele);
        });
        else result.push(element);
    });
    else result.push(data);
    return result;
}

export default function Feed(){
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const username = router.query.user;

    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        if(username !== undefined){

            axios.get(POSTS_API+'self/'+username,{
                headers:{
                    'Authorization': token
                }
            }).then((response)=>{
                setPosts(extractData(response.data.data).sort(function(a, b) {
                    let time1 = new Date(a.updated_at);
                    let time2 = new Date(b.updated_at);
    
                    return time2 - time1;
                  })
                );
            }).catch((error)=>{
                console.log(error);
            })
        }
    },[router]);

    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <CreatePostForm></CreatePostForm>
            </div>
            {posts.map((element,key) => {
                return(
                <LazyLoad key={key} height={200} placeholder={<Loading/>}>                       
                    <Post key={key} post={element}></Post>
                </LazyLoad>
                )
            })}
        </div>
    )
}