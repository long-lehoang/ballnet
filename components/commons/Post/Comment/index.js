import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { AVATAR, HOST, POSTS_API } from '../../../../config/config';
import styles from './styles.module.scss';

export default function Comment(props) {
    const profile = useSelector(state => state.profile);
    const [comment, setComment] = useState();
    const [listComment, setListComment] = useState([]);
    const token = useSelector(state => state.token);
    const user = useSelector(state=>state.infoUser);
    const profile = useSelector(state=>state.profile);

    function handleSubmit(event)
    {
        event.preventDefault();

        let formData = new FormData();
        formData.append("comment", comment);
        
        axios.post(POSTS_API + props.post.id + '/comment', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            props.toggleComment(true);
            props.setCountComment(props.countComment + 1);

            let list = [...listComment]
            let obj = {
                username: user.username,
                name: user.name,
                avatar: profile.avatar,
                comment: comment
            }
            list.push(obj);
            setListComment(list);

            setComment("");
        }).catch((error) => {
            console.log(error.message);
        });
    }

    useEffect(() => {
        axios.get(POSTS_API + props.id + '/comment', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            let arr = [...listComment]
            arr.concat(response.data.data);
            setListComment(arr);
        })
    }, [null]);

    return (
        <div className={styles.comments}>
            <hr></hr>
            <form className={styles.input} onSubmit={handleSubmit}>
                <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
                <input placeholder={"Nhập bình luận"} value={comment} onChange={(event) => { setComment(event.target.value) }}></input>
            </form>
            {listComment.map((cmt,key) => {
                return (
                    <LazyLoad className={styles.comment} key={key} placeholder="Loading...">
                        <img src={cmt.avatar == null ? AVATAR : HOST + cmt.avatar} className={styles.avatar}></img>
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