import { faClock, faComment, faEllipsisV, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import Comment from './Comment'
import { useEffect, useState } from 'react';
import { AVATAR, HOST, POSTS_API } from '../../../config/config';
import axios from 'axios';
import convertTime from '../../../lib/time';
import Link from 'next/link';
import EditPostForm from '../EditPostForm';
import tagging from '../../../lib/tags';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

export default function Post(props) {
    const token = useSelector(state => state.token);
    const user = useSelector(state=>state.infoUser);
    const [images, setImages] = useState([]);
    const [avatarAuthor, setAvatarAuthor] = useState('');
    const [nameAuthor, setNameAuthor] = useState('');
    const [usernameAuthor, setUsernameAuthor] = useState('');
    const [countLike, setCountLike] = useState(0);
    const [countComment, setCountComment] = useState(0);
    const [countShare, setCountShare] = useState(0);
    const [edit, toggleEdit] = useState(false);
    const [tags, setTags] = useState([]);
    const [del, setDel] = useState(false);
    const [like, toggleLike] = useState(false);
    const [share, toggleShare] = useState(false);
    const [comment, toggleComment] = useState(false);
    const [activeComment, toggleActiveComment] = useState(false);
    const [content, setContent] = useState(props.post.content);
    const [permission, setPermission] = useState(props.post.private);
    const [location, setLocation] = useState(props.post.location);
    function handleDelete() {
        setDel(true);
        axios.delete(POSTS_API + props.post.id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data.message);
        }).catch((error) => {
            console.log(error.message);
        });
    }

    useEffect(() => {

        if (props.post.id !== undefined) {
            axios.get(POSTS_API + props.post.id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data.data);
                let result = response.data.data;
                setNameAuthor(result.author.name);
                setUsernameAuthor(result.author.username);
                if (result.author.avatar != null)
                    setAvatarAuthor(HOST + result.author.avatar);
                setCountLike(result.like);
                toggleLike(result.isLike);
                setCountComment(result.comment);
                toggleComment(result.isComment);
                setCountShare(result.share);
                toggleShare(result.isShare);
                setImages(result.images);
                setTags(result.tags);
            }).catch((error) => {
                console.log(error.response.data.message);
            })
        }
    }, [edit])


    function handleLike() {
        if (like) {
            toggleLike(false);
            setCountLike(countLike - 1);

            axios.delete(POSTS_API + props.post.id + '/like', {
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
            axios.post(POSTS_API + props.post.id + '/like', {}, {
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


    function handleShare() {

        if (share) {
            toggleShare(false);
            setCountShare(countShare - 1);
            axios.delete(POSTS_API + props.post.id + '/share', {
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

            axios.post(POSTS_API + props.post.id + '/share', {}, {
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
        <div className={del ? styles.none : styles.container}>
            <div className={styles.header}>
                <div className={styles.col}>
                    <div className={styles.avatar}>
                        <img src={avatarAuthor == '' ? AVATAR : avatarAuthor}></img>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.name}>
                            <Link href={`/${usernameAuthor}`}><a>{nameAuthor} </a></Link> 
                            {location !== null ? <span> <FormattedMessage id="is at" /> {location} </span> : ''}
                            {tags.length > 0 ? <span> <FormattedMessage id="is stay with" /> {tagging(tags)} </span> : ''}
                        </div>
                        <div className={styles.time}>
                            <FontAwesomeIcon icon={faClock} className={styles.iconTime}></FontAwesomeIcon>
                            <span className={styles.text}>{convertTime(props.post.updated_at)}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    {user.id == props.post.user_id ? <button className={styles.btn}><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></button> : ''}
                    <div className={styles.popup}>
                        <button onClick={() => { toggleEdit(!edit) }}><FormattedMessage id="Edit" /></button>
                        <button onClick={handleDelete}><FormattedMessage id="Delete" /></button>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <span>{content}</span>
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
                            <span className={styles.txtLike}><FormattedMessage id="Like" /> {countLike}</span>
                        </button>
                    </div>
                    <div className={comment ? styles.activeComment : styles.comment}>
                        <button onClick={() => { toggleActiveComment(!activeComment) }}>
                            <FontAwesomeIcon icon={faComment} className={styles.iconComment}></FontAwesomeIcon>
                            <span className={styles.txtComment}><FormattedMessage id="Comment" /> {countComment}</span>
                        </button>
                    </div>
                </div>
                <div className={styles.col}>
                    <button className={share ? styles.activeShare : styles.share} onClick={handleShare}>
                        <FontAwesomeIcon icon={faShare} className={styles.iconShare}></FontAwesomeIcon>
                        <span className={styles.txtShare}><FormattedMessage id="Share" /> {countShare}</span>
                    </button>
                </div>
            </div>
            {activeComment ? <Comment id={props.post.id} setCountComment={setCountComment} countComment={countComment} toggleComment={toggleComment} /> : <div></div>}
            {
                edit ?
                    <EditPostForm
                        show={edit}
                        setShow={toggleEdit}
                        toggle={toggleEdit}
                        content={content}
                        id={props.post.id}
                        permission={permission}
                        images={images}
                        location={location}
                        tags={tags}
                        setContent={setContent}
                        setPermission={setPermission}
                        setLocation={setLocation}
                        setTags={setTags}
                        setImages={setImages}
                    /> :
                    <div></div>
            }
        </div>
    )
}
