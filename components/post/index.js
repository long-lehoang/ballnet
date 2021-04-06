import { faClock, faComment, faEllipsisV, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AVATAR, HOST, POSTS_API } from "../../config/config";
import tagging from "../../lib/tags";
import convertTime from "../../lib/time";
import EditPostForm from "../commons/EditPostForm";
import Comment from "../commons/Post/Comment";
import styles from "./styles.module.scss";

export default function PostPage({postD, permission}) {
    const router = useRouter();
    const id = router.query.post_id;
    const post = postD.post;
    const images = postD.images;
    const avatarAuthor = postD.author.avatar ? HOST + postD.author.avatar : AVATAR;
    const nameAuthor = postD.author.name;
    const usernameAuthor = postD.author.username;
    const tags = postD.tags;

    const [countLike, setCountLike] = useState(postD.like);
    const [countComment, setCountComment] = useState(postD.comment);
    const [countShare, setCountShare] = useState(postD.share);
    const [edit, toggleEdit] = useState(false);
    const [like, toggleLike] = useState(postD.isLike);
    const [share, toggleShare] = useState(postD.isShare);
    const [comment, toggleComment] = useState(postD.isComment);
    const [activeComment, toggleActiveComment] = useState(false);
    const token = useSelector(state => state.token);

    function handleDelete() {
        axios.delete(POSTS_API + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            router.replace('/');
        }).catch((error) => {
            console.log(error.message);
        });
    }

    function handleLike() {
        if (like) {
            toggleLike(false);
            setCountLike(countLike - 1);

            axios.delete(POSTS_API + id + '/like', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data.message);
            }).catch((error) => {
                console.log(error.message);
            });
        } else {
            toggleLike(true);
            setCountLike(countLike + 1);
            axios.post(POSTS_API + id + '/like', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data.message);
            }).catch((error) => {
                console.log(error.message);
            });
        }
    }

    function handleComment(value) {
        var formData = new FormData();
        formData.append("comment", value);
        toggleComment(true);
        setCountComment(countComment + 1);

        axios.post(POSTS_API + id + '/comment', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data.message);
        }).catch((error) => {
            console.log(error.message);
        });
    }

    function handleShare() {
        if (share) {
            toggleShare(false);
            setCountShare(countShare - 1);
            axios.delete(POSTS_API + id + '/share', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data.message);
            }).catch((error) => {
                console.log(error.message);
            });
        } else {
            toggleShare(true);
            setCountShare(countShare + 1);

            axios.post(POSTS_API + id + '/share', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data.message);
            }).catch((error) => {
                console.log(error.message);
            });
        }
    }
    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.col}>
                        <div className={styles.avatar}>
                            <img src={avatarAuthor == '' ? AVATAR : avatarAuthor}></img>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.name}>
                                <Link href={`/${usernameAuthor}`}><a>{nameAuthor}</a></Link> {tagging(tags)}
                            </div>
                            <div className={styles.time}>
                                <FontAwesomeIcon icon={faClock} className={styles.iconTime}></FontAwesomeIcon>
                                <span className={styles.text}>{convertTime(post.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <button className={styles.btn}><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></button>
                        <div className={styles.popup}>
                            <button onClick={() => { toggleEdit(!edit) }}>Edit</button>
                            {permission ? <button onClick={handleDelete}>Delete</button> : ''}
                        </div>
                    </div>
                </div>
                <div className={styles.body}>
                    <span>{post.content}</span>
                    <div className={styles.images}>
                        {images.map((img, key) => {
                            return (<img key={key} src={HOST + img}></img>)
                        })}
                    </div>
                </div>
                <hr></hr>
                <div className={styles.reaction}>
                    <div className={styles.col}>
                        <div className={like ? styles.activeLike : styles.like}>
                            <button onClick={handleLike}>
                                <FontAwesomeIcon icon={faHeart} className={styles.iconLike}></FontAwesomeIcon>
                                <span className={styles.txtLike}>Like {countLike}</span>
                            </button>
                        </div>
                        <div className={comment ? styles.activeComment : styles.comment}>
                            <button onClick={() => { toggleActiveComment(!activeComment) }}>
                                <FontAwesomeIcon icon={faComment} className={styles.iconComment}></FontAwesomeIcon>
                                <span className={styles.txtComment}>Comment {countComment}</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <button className={share ? styles.activeShare : styles.share} onClick={handleShare}>
                            <FontAwesomeIcon icon={faShare} className={styles.iconShare}></FontAwesomeIcon>
                            <span className={styles.txtShare}>Share {countShare}</span>
                        </button>
                    </div>
                </div>
                {activeComment ? <Comment id={id} handleComment={handleComment} /> : <div></div>}
                {
                    edit ?
                        <EditPostForm
                            show={edit}
                            setShow={toggleEdit}
                            toggle={toggleEdit}
                            content={post.content}
                            id={id}
                            permission={post.private}
                            images={images}
                            location={post.location}
                            tags={tags}
                        /> :
                        <div></div>
                }
            </div>
        </div>
    )
}