import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { AVATAR, HOST, POSTS_API } from '../../../../config/config';
import styles from './styles.module.scss';

export default function Comment(props){
    const profile = useSelector(state => state.profile);
    const [comment, setComment] = useState();
    const [listComment, setListComment] = useState([]);
    const [load,setLoad] = useState();

    Pusher.logToConsole = true;
    var pusher = new Pusher('903afb56e4567c43f695', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('comment', function(data) {
        alert(JSON.stringify(data));
    });

    useEffect(()=>{
        const token = localStorage.getItem("access_token");
        axios.get(POSTS_API+props.id+'/comment',{
            headers:{
                'Authorization': token
            }
        }).then((response)=>{
            setListComment(response.data.data.data);
        })
    },[load]);

    return(
        <div className={styles.comments}>
            <hr></hr>
            <form className={styles.input} onSubmit={(event)=>{
                    event.preventDefault();
                    props.handleComment(comment);
                    setComment("");
                    setLoad(true);
                }}>
                <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar}></img>
                <input placeholder="Type a comment" value={comment} onChange={(event)=>{setComment(event.target.value)}}></input>
            </form>
            {listComment.map(cmt=>{
                return(
                    <LazyLoad className={styles.comment} key={cmt.id}  placeholder="Loading...">
                        <img src={cmt.avatar == null ? AVATAR : HOST+cmt.avatar} className={styles.avatar}></img>
                        <div className={styles.content}>
                            <div className={styles.group}>
                                <Link href={`/${cmt.username}`}><a className={styles.name}>{cmt.name}</a></Link>
                                <div className={styles.text}>{cmt.comment}</div>
                            </div>
                        </div>
                    </LazyLoad>
                )
            })}
        </div>
    )
}