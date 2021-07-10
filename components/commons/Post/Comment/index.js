import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { AVATAR, HOST, POSTS_API } from '../../../../config/config';
import convertTime from '../../../../lib/time';
import styles from './styles.module.scss';

export default function Comment(props) {
    const profile = useSelector(state => state.profile);
    const [comment, setComment] = useState();
    const [listComment, setListComment] = useState([]);
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.infoUser);

    function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append("comment", comment);

        axios.post(POSTS_API + props.id + '/comment', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Socket-ID': window.Echo.socketId()
            }
        }).then((response) => {
            //
        }).catch((error) => {
            console.log(error);
        });

        props.toggleComment(true);
        props.setCountComment(props.countComment + 1);

        let list = listComment
        let obj = {
            username: user.username,
            name: user.name,
            avatar: profile.avatar,
            comment: comment,
            time: new Date(),
        }
        list.push(obj);
        setListComment(list);
        setComment("");
    }

    useEffect(() => {
        axios.get(POSTS_API + props.id + '/comment', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((response) => {
            let arr = [...listComment]
            arr = arr.concat(response.data.data);
            setListComment(arr);
        })
    }, [null]);

    useEffect(() => {
        window.Echo.private(`App.Models.Post.${props.id}`)
            .listen('.comment', (e) => {
                props.setCountComment(e.count);
                let list = listComment
                list.push(e);
                setListComment(list);
            })
            .listen('.un.comment',function(e){
                props.setCountComment(e.count);

                let list = [...listCmt];
                list = list.filter( e => e.cmt_id != e.cmt_id);
                setListComment(list);
            });
    }, [null])

    return (
        <div className={styles.comments}>
            <hr></hr>
            <form className={styles.input} onSubmit={handleSubmit}>
                <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
                <input placeholder={"Nhập bình luận"} value={comment} onChange={(event) => { setComment(event.target.value) }}></input>
            </form>
            <div className={styles.list}>

                {listComment.map((cmt, key) => {
                    return (
                        <LazyLoad className={styles.comment} key={cmt.cmt_id} placeholder="Loading...">
                            <img src={cmt.avatar == null ? AVATAR : HOST + cmt.avatar} className={styles.avatar}></img>
                            <div className={styles.content}>
                                <div className={styles.group}>
                                    <Link href={`/${cmt.username}`}><a className={styles.name}>{cmt.name}</a></Link>
                                    <div className={styles.text}>{cmt.comment}</div>
                                </div>
                                <div className={styles.time}>{convertTime(cmt.time)}</div>
                            </div>
                        </LazyLoad>
                    )
                })}
            </div>
        </div>
    )
}