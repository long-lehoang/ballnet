import Notification from '../../notifications';
import convertTime from '../../../lib/time';
import { AVATAR, FRIEND_REQUESTS_API, HOST } from '../config/config';

const LIKE = "App\\Notifications\\LikePost"
const COMMENT = "App\\Notifications\\CommentPost"
const SHARE = "App\\Notifications\\SharePost"
const FRIEND_REQUEST = "App\\Notifications\\FriendRequest"
const NEW_FRIEND = "App\\Notifications\\NewFriend"

export function showNotice(data) {
    //prepare text
    let link,avatar,text,time,read,linkAccept,linkDeny;
    switch (data.type) {
        case LIKE:
            link = `/post/${data.data.post_id}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} liked your post.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    />
        case COMMENT:
            link = `/post/${data.data.post_id}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} commented your post.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    />
        case SHARE:
            link = `/post/${data.data.post_id}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} shared your post.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    />
        case FRIEND_REQUEST:
            link = `/${data.data.username}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} want to be friend with you.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = FRIEND_REQUESTS_API + `${data.data.friend_request}/accept`;
            linkDeny = FRIEND_REQUESTS_API + `${data.data.friend_request}/deny`;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    linkAccept={linkAccept}
                    linkDeny={linkDeny}
                    />
        case NEW_FRIEND:
            link = `/${data.data.username}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} and you already have been friend.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    />
        default:
            break;
    }
}