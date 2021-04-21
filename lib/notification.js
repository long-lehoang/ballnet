import Notification from '../components/notifications';
import convertTime from './time';
import { AVATAR, AVATAR_TEAM, FRIEND_REQUESTS_API, HOST, NOTIFICATION, TEAM_REQUEST_API } from '../config/config';

export function showNotice(data) {

    const LIKE = "App\\Notifications\\LikePost"
    const COMMENT = "App\\Notifications\\CommentPost"
    const SHARE = "App\\Notifications\\SharePost"
    const FRIEND_REQUEST = "App\\Notifications\\FriendRequest"
    const NEW_FRIEND = "App\\Notifications\\NewFriend"
    const NEW_TEAM = "App\\Notifications\\NewTeam"
    const NEW_MEMBER = "App\\Notifications\\NewMember"
    const INVITE_JOIN_TEAM = "App\\Notifications\\InviteJoinTeam"
    const REQUEST_JOIN_TEAM = "App\\Notifications\\RequestJoinTeam"

    //prepare text
    let link,avatar,text,time,read,linkAccept,linkDeny,linkDelNtf;
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
            linkDelNtf = NOTIFICATION + data.data.notification_id;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    linkAccept={linkAccept}
                    linkDeny={linkDeny}
                    linkDelNtf={linkDelNtf}
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
        case NEW_TEAM:
            link = `/team/${data.data.team_id}`;
            text = `${data.data.name} already have been created successfully.`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    />
        case NEW_MEMBER:
            link = `/team/${data.data.team_id}`;
            text = `You already have been member of ${data.data.team_name}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    />
        case INVITE_JOIN_TEAM:
            link = `/team/${data.data.team_id}`;
            text = `${data.data.user_name} invite you to join ${data.data.team_name}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = TEAM_REQUEST_API + `${data.data.request_id}/approve`;
            linkDeny = TEAM_REQUEST_API + `${data.data.request_id}/deny`;
            linkDelNtf = NOTIFICATION + data.data.id;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    linkAccept={linkAccept}
                    linkDeny={linkDeny}
                    linkDelNtf={linkDelNtf}
                    />
        case REQUEST_JOIN_TEAM:
            link = `/${data.data.username}`;
            text = `${data.data.user_name} want to join ${data.data.team_name}`;
            avatar = data.data.user_avatar ? HOST + data.data.user_avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = TEAM_REQUEST_API + `${data.data.request_id}/approve`;
            linkDeny = TEAM_REQUEST_API + `${data.data.request_id}/deny`;
            linkDelNtf = NOTIFICATION + data.data.id;
            return <Notification 
                    link={link} 
                    avatar={avatar} 
                    text={text} 
                    time={time} 
                    read={read} 
                    linkAccept={linkAccept}
                    linkDeny={linkDeny}
                    linkDelNtf={linkDelNtf}
                    />
        default:
            break;
    }
}