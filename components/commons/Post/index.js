import { faClock, faComment, faEllipsisV, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import Comment from './Comment'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR, HOST, POSTS_API, PROFILE_API } from '../../../config/config';
import axios from 'axios';
export default function Post(props){
    const [comment, toggleComment] = useState(false);
    const [images, setImages] = useState();
    const [detailPost, setDetailPost] = useState();
    const post = props.post;

    //get detail post
    useEffect(()=>{
        const token = localStorage.getItem("access_token");

        axios.get(POSTS_API+props.post.id,{
            headers:{
                'Authorization': token
            }
        })
    },[null]);
    // axios.get(PROFILE_API+post->user_id).then((response)=>{
    
    // })
    // console.log(props.post);
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.col}>
                    <div className={styles.avatar}>
                        <img src="/avatar.jpg"></img>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.name}>
                            <span>Lee Parkour</span>
                        </div>
                        <div className={styles.time}>
                            <FontAwesomeIcon icon={faClock} className={styles.iconTime}></FontAwesomeIcon>
                            <span className={styles.text}>{props.post.update_at}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <button className={styles.btn}><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></button>
                </div>
            </div>
            <div className={styles.body}>
                <span>{props.post.content}</span>
            </div>
            <hr></hr>
            <div className={styles.reaction}>
                <div className={styles.col}>
                    <div className={styles.like}>
                        <button>
                            <FontAwesomeIcon icon={faHeart} className={styles.iconLike}></FontAwesomeIcon>
                            <span className={styles.txtLike}>Like 20</span>
                        </button>
                    </div>
                    <div className={comment ? styles.activeComment : styles.comment}>
                        <button onClick={()=>{toggleComment(!comment)}}>
                            <FontAwesomeIcon icon={faComment} className={styles.iconComment}></FontAwesomeIcon>
                            <span className={styles.txtComment}>Comment 20</span>
                        </button>
                    </div>
                </div>
                <div className={styles.col}>
                    <button className={styles.share}>
                        <FontAwesomeIcon icon={faShare} className={styles.iconShare}></FontAwesomeIcon>
                        <span className={styles.txtShare}>Share 20</span>
                    </button>
                </div>
            </div>
            {comment ? <Comment/> : <div></div>}
        </div>
    )
}