import axios from 'axios';
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
    useEffect(()=>{
        const token = localStorage.getItem("access_token");
        axios.get(POSTS_API+props.id+'/comment',{
            headers:{
                'Authorization': token
            }
        }).then((response)=>{
            setListComment(response.data.data.data);
        })
    },null);

    return(
        <div className={styles.comments}>
            <hr></hr>
            <form className={styles.input} onSubmit={(event)=>{
                    event.preventDefault();
                    props.handleComment(comment);
                    setComment("");
                }}>
                <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar} className={styles.avatar}></img>
                <input placeholder="Type a comment" value={comment} onChange={(event)=>{setComment(event.target.value)}}></input>
            </form>
            <div className={styles.comment}>
            {listComment.map(cmt=>{
                return(
                    <LazyLoad key={cmt.id}  placeholder="Loading...">
                        <img src="/avatar.jpg" className={styles.avatar}></img>
                        <div className={styles.content}>
                            <div className={styles.group}>
                                <div className={styles.name}>{cmt.name}</div>
                                <div className={styles.text}>{cmt.comment}</div>
                            </div>
                        </div>
                    </LazyLoad>
                )
            })}
            </div>
        </div>
    )
}