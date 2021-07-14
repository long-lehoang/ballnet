import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR, HOST, ROOM } from "../../config/config";
import ItemFriend from "./ItemFriend";
import ItemRoom from "./ItemRoom";
import ItemMessage from "./ItemMessage";
import styles from "./styles.module.scss"
import axios from "axios";
import { setMessage } from "../../slices/messageSlice";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroller";
import Typing from '../commons/Typing';

export default function Message({ friendsz, roomsz }) {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const user = useSelector(state => state.infoUser)
    const profile = useSelector(state => state.profile)
    const [friends, setFriends] = useState(friendsz);
    const [rooms, setRooms] = useState(roomsz)
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState([])
    const [friend, setFriend] = useState({
        avatar: null,
        username: "",
        id: '',
        name: "",
        status: ''
    });
    const [messInput, setMessInput] = useState('');
    const [view, setView] = useState(0);

    function selectRoom(id) {
        setRoom(id);
        axios.get(ROOM + `${id}/party/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setFriend(res.data.data);
        }).catch(err => {
            openMessageBox("Error");
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    function handleInput(event) {
        setMessInput(event.target.value);
    }
    //handle typing event...........
    const [typing, setTyping] = useState(false);
    const [focusInput, setFocus] = useState(false);
    function handleFocus()
    {
        setFocus(true);
    }

    function handleFocusout()
    {
        setFocus(false);
    }

    useEffect(()=>{
        if(focusInput){
            window.Echo.private(`App.Models.Room.${room}`)
            .whisper('typing', {})
        }else{
            window.Echo.private(`App.Models.Room.${room}`)
            .whisper('untyping', {})
        }
    }, [focusInput])
    //handle typing...........

    function handleEnter(event) {
        
        if (event.which == 13)
            handleSend();
    }

    function handleSend() {
        if (messInput == '')
            return false;

        let arr = messages;
        arr.push({
            username: user.username,
            avatar: profile.avatar,
            message: messInput,
            created_at: new Date(),
        })
        setMessages(arr);
        scrollToBottom();

        window.Echo.private(`App.Models.Room.${room}`)
            .whisper('send', {
                username: user.username,
                avatar: profile.avatar,
                message: messInput,
                created_at: new Date(),
            })

        let formData = new FormData();
        formData.append('message', messInput)
        axios.post(ROOM + `${room}/messages/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            //nothing
        }).catch(err => {
            setMessages(messages=>{
                messages.pop();
                return messages;
            });

            window.Echo.private(`App.Models.Room.${room}`)
                .whisper('unsend', {
                    username: user.username,
                    message: messInput,
                })
        })

        setMessInput('');
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        setMessages([]);
        setHasMore(true);
        setNextUrl('');
        if(room!=undefined){
            window.Echo.private(`App.Models.Room.${room}`)
                .listenForWhisper('send', (e) => {
                    setMessages(messages=>[...messages,e]);
                })
                .listenForWhisper('unsend', (e) => {
                    setMessages(messages=>{
                        const index = messages.findIndex(x => x.username === e.username && x.message == e.message);
                        if (index > -1) {
                            return messages.splice(index, 1);
                        }else{
                            return messages;
                        }
                    });
                })
                .listenForWhisper('typing', () => {
                    if(!typing){
                        setTyping(true);
                    }
                })
                .listenForWhisper('untyping', () => {
                    if(typing){
                        setTyping(false);
                    }
                });
        }
    }, [room]);

    const [hasMore, setHasMore] = useState(true);
    const [nextUrl, setNextUrl] = useState('');
    const [wait, setWait] = useState(false);

    function loadMore(page) {
        let url = ''

        if (wait) {
            return false;
        }

        if (nextUrl != null) {
            if (nextUrl == '') {
                url = ROOM + `${room}/messages?page=1`;
            } else {
                url = nextUrl;
            }
        } else {
            return false;
        }

        setWait(true);

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.data.data.data.length > 0) {
                setMessages(messages=>{
                    return response.data.data.data.reverse().concat(messages);
                });
            }
            setNextUrl(response.data.data.next_page_url);
            setWait(false);
            if (response.data.data.next_page_url == null) {
                setHasMore(false);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.selectBox}>
                <div className={styles.header}>
                    <button onClick={() => setView(0)}><span className={view == 0 ? styles.active : ''}><FormattedMessage id="Message" /></span></button>
                    <button onClick={() => setView(1)}><span className={view == 1 ? styles.active : ''}><FormattedMessage id="Friend" /></span></button>
                    {/* <button><FontAwesomeIcon height={15} icon={faEllipsisV}/></button> */}
                </div>
                <div className={styles.list}>
                    {view == 0 ?
                        rooms.map((element, key) => {
                            return <ItemRoom
                                key={element.id}
                                selectRoom={selectRoom}
                                selected={element.id == room}
                                id={element.id}
                                img={element.avatar}
                                name={element.name}
                                lastMessage={element.last_message != null ? element.last_message.message : ''}
                                lastTime={element.last_message != null ? element.last_message.created_at : ''}
                            />
                        }) :
                        friends.map((element, key) => {
                            return <ItemFriend
                                key={element.id}
                                selectRoom={selectRoom}
                                id={element.id}
                                img={element.avatar}
                                name={element.name}
                                status={element.status}
                                username={element.username}
                                rooms={rooms}
                                setRooms={setRooms}
                                setView={setView}
                            />
                        })}
                </div>
            </div>
            <div className={styles.messageBox}>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <Link href={`/${friend.username}`}><img src={friend.avatar == null ? AVATAR : HOST + friend.avatar} height={40} width={40} alt="avatar"></img></Link>
                        <div>
                            <span className={styles.name}>{friend.name}</span>
                            {friend.status == 0 ?
                                <span className={styles.offline}><FormattedMessage id="Offline" /></span> :
                                <span className={styles.online}><FormattedMessage id="Online" /></span>
                            }
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button><FontAwesomeIcon height={15} icon={faEllipsisV} /></button>
                    </div>
                </div>
                <div className={styles.main}>
                    {room != undefined ?
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={loadMore}
                            hasMore={hasMore}
                            loader={<div className="loader" key={0}>Loading ...</div>}
                            useWindow={false}
                            isReverse={true}
                            threshold={100}
                        >
                            {messages.map((element, key) => {
                                return <ItemMessage key={`${element.username+key+element.message}`} username={element.username} avatar={element.avatar} message={element.message} time={element.created_at} />
                            })}
                            {typing ? <Typing /> : ''}
                        </InfiniteScroll>
                        : ''}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className={styles.footer}>
                    <input type="text" value={messInput} onBlur={handleFocusout} onFocus={handleFocus} onChange={handleInput} onKeyUp={handleEnter} ></input>
                    <button onClick={handleSend}><FormattedMessage id="Send" /></button>
                </div>
            </div>
        </div>
    )
}