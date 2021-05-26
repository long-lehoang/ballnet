import Notification from '../components/notifications';
import convertTime from './time';
import { AVATAR, AVATAR_TEAM, FRIEND_REQUESTS_API, HOST, MATCH_INVITATION_API, MATCH_JOINING_API, NOTIFICATION, TEAM_REQUEST_API } from '../config/config';

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
    const USER_LEAVE_TEAM = "App\\Notifications\\UserLeaveTeam"
    const NEW_JOINING_MATCH = "App\\Notifications\\NewJoiningMatch"
    const REQUEST_JOINING_MATCH = "App\\Notifications\\RequestJoiningMatch"
    const MATCH_INVITATION = "App\\Notifications\\MatchInvitation"
    const NEW_MATCH = "App\\Notifications\\NewMatch"
    const DELETE_MATCH = "App\\Notifications\\DeleteMatch"
    const TEAM_LEAVE_MATCH = "App\\Notifications\\TeamLeaveMatch"
    const ACCEPT_MATCH_INVITATION = "App\\Notifications\\AcceptMatchInvitation"
    const INVITE_JOIN_MATCH = "App\\Notifications\\InviteJoinMatch"
    const TEAM_REQUEST_MATCH = "App\\Notifications\\TeamRequestMatch"
    const UPDATE_MATCH = "App\\Notifications\\UpdateMatch"
    const SUGGEST_MATCH = "App\\Notifications\\SuggestMatch"
    const USER_LEAVE_MATCH = "App\\Notifications\\UserLeaveMatch"
    const SUGGEST_MATCH_USER = "App\\Notifications\\SuggestMatchUser"
    const REVIEW_MATCH = "App\\Notifications\\ReviewMatch"
    const REVIEW_STADIUM = "App\\Notifications\\ReviewStadium"
    const UPCOMING_MATCH = "App\\Notifications\\UpcomingMatch"
    const NEW_STADIUM = "App\\Notifications\\NewStadium"
    
    //prepare text
    let link, avatar, text, time, read,
        linkAccept, linkDeny, linkDelNtf,
        acceptMethod, delMethod, linkJoin,
        dataJoin;
    switch (data.type) {
        case LIKE:
            link = `/post/${data.data.post_id}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} đã thích bài viết của bạn.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case COMMENT:
            link = `/post/${data.data.post_id}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} đã bình luận trên bài viết của bạn.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case SHARE:
            link = `/post/${data.data.post_id}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} đã chia sẻ bài viết của bạn.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case FRIEND_REQUEST:
            link = `/${data.data.username}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            text = `${data.data.name} muốn kết bạn với bạn.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = FRIEND_REQUESTS_API + `${data.data.friend_request}/accept`;
            linkDeny = FRIEND_REQUESTS_API + `${data.data.friend_request}/deny`;
            return <Notification key={data.data.id}
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
            text = `${data.data.name} và bạn vừa trở thành bạn bè.`;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case NEW_TEAM:
            link = `/team/${data.data.team_id}`;
            text = `${data.data.name} vừa được tạo thành công.`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case NEW_MEMBER:
            link = `/team/${data.data.team_id}`;
            text = `Bạn vừa trở thành thành viên của ${data.data.team_name}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case INVITE_JOIN_TEAM:
            link = `/team/${data.data.team_id}`;
            text = `${data.data.user_name} mời bạn tham gia ${data.data.team_name}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = TEAM_REQUEST_API + `${data.data.request_id}/approve`;
            linkDeny = TEAM_REQUEST_API + `${data.data.request_id}/deny`;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkAccept={linkAccept}
                linkDeny={linkDeny}
            />
        case REQUEST_JOIN_TEAM:
            link = `/${data.data.username}`;
            text = `${data.data.user_name} muốn tham gia ${data.data.team_name}`;
            avatar = data.data.user_avatar ? HOST + data.data.user_avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = TEAM_REQUEST_API + `${data.data.request_id}/approve`;
            linkDeny = TEAM_REQUEST_API + `${data.data.request_id}/deny`;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkAccept={linkAccept}
                linkDeny={linkDeny}
            />
        case UPDATE_MATCH:
            link = `team/${data.data.team_id}`;
            text = `${data.data.team_name} vừa cập nhật trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case USER_LEAVE_TEAM:
            link = `/${data.data.username}`;
            text = `${data.data.name} đã rời khỏi trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case REQUEST_JOINING_MATCH:
            link = `/${data.data.username}`;
            text = `${data.data.name} muốn tham gia trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = MATCH_JOINING_API + data.data.request_id;
            linkDeny = MATCH_JOINING_API + data.data.request_id;
            delMethod = 'delete';
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkAccept={linkAccept}
                linkDeny={linkDeny}
                delMethod={delMethod}
            />
        case MATCH_INVITATION:
            link = `team/${data.data.team_id}`;
            text = `${data.data.team_name} (Đội) mời đội của bạn (${data.data.my_team_name}) để tham gia (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = MATCH_INVITATION_API + `${data.data.my_team_id}/${data.data.request_id}/accept`;
            linkDeny = MATCH_INVITATION_API + `${data.data.my_team_id}/${data.data.request_id}/cancel`;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkAccept={linkAccept}
                linkDeny={linkDeny}
            />
        case SUGGEST_MATCH:
            link = `team/${data.data.team_id}`;
            text = `${data.data.name} đã gợi ý đội của bạn (${data.data.team_name}) để tham gia (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = MATCH_INVITATION_API + `${data.data.team_id}/${data.data.request_id}/accept`;
            linkDeny = MATCH_INVITATION_API + `${data.data.team_id}/${data.data.request_id}/cancel`;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkAccept={linkAccept}
                linkDeny={linkDeny}
            />
        case TEAM_REQUEST_MATCH:
            link = `team/${data.data.team_id}`;
            text = `${data.data.team_name} (Team) want để tham gia (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = MATCH_INVITATION_API + `${data.data.my_team_id}/${data.data.request_id}/accept`;
            linkDeny = MATCH_INVITATION_API + `${data.data.my_team_id}/${data.data.request_id}/cancel`;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkAccept={linkAccept}
                linkDeny={linkDeny}
            />
        case NEW_MATCH:
            link = `team/${data.data.team_id}`;
            text = `${data.data.team_name} (Đội) vừa tạo trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkJoin = MATCH_JOINING_API;
            dataJoin = new FormData();
            dataJoin.append('team_id', data.data.team_id);
            dataJoin.append('match_id', data.data.match_id);
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkJoin={linkJoin}
                dataJoin={dataJoin}
            />
        case DELETE_MATCH:
            link = `team/${data.data.team_id}`;
            text = `${data.data.team_name} (Đội) vừa hủy trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case TEAM_LEAVE_MATCH:
            link = `team/${data.data.team_id}`;
            text = `${data.data.team_name} (Đội) vừa rời khỏi trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case ACCEPT_MATCH_INVITATION:
            link = `team/${data.data.team_id}`;
            text = `${data.data.team_name} (Đội) vừa tham gia trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.team_avatar ? HOST + data.data.team_avatar : AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case INVITE_JOIN_MATCH:
            link = `/${data.data.username}`;
            text = `${data.data.name} mời bạn tham gia (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = MATCH_JOINING_API + data.data.request_id;
            linkDeny = MATCH_JOINING_API + data.data.request_id;
            acceptMethod = 'put';
            delMethod = 'delete';
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkAccept={linkAccept}
                acceptMethod={acceptMethod}
                linkDeny={linkDeny}
                delMethod={delMethod}
            />
        case NEW_JOINING_MATCH:
            link = `/${data.data.username}`;
            text = `${data.data.name} vừa tham gia trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case USER_LEAVE_MATCH:
            link = `/${data.data.username}`;
            text = `${data.data.name} vừa rời khỏi trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case SUGGEST_MATCH_USER:
            link = `/${data.data.username}`;
            text = `${data.data.name} gợi ý bạn tham gia trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = data.data.avatar ? HOST + data.data.avatar : AVATAR;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            linkAccept = MATCH_JOINING_API + data.data.request_id;
            linkDeny = MATCH_JOINING_API + data.data.request_id;
            acceptMethod = 'put';
            delMethod = 'delete';
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                linkAccept={linkAccept}
                acceptMethod={acceptMethod}
                linkDeny={linkDeny}
                delMethod={delMethod}
            />
        case REVIEW_MATCH:
            link = ``;
            text = `Đánh giá thành viên sau trận đấu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            let match = data.data.match_id;
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                match={match}
            />

        case REVIEW_STADIUM:
            link = ``;
            text = `Đánh giá sân vận động ${data.data.name}.`;
            avatar = AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            let booking = data.data.book_id;
            
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
                booking={booking}
            />
        case UPCOMING_MATCH:
            link = ``;
            text = `Một trận đấu sắp bắt đầu (${data.data.sport} - ${data.data.type_sport}) tại ${data.data.location}, bắt đầu lúc ${data.data.time_start}`;
            avatar = AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            
            return <Notification key={data.data.id}
                link={link}
                avatar={avatar}
                text={text}
                time={time}
                read={read}
            />
        case NEW_STADIUM:
            link = `/stadium/${data.data.stadium_id}`;
            text = `${data.data.stadium_name} vừa được tạo thành công.`;
            avatar = AVATAR_TEAM;
            time = convertTime(data.created_at);
            read = data.read_at !== null;
            
            return <Notification key={data.data.id}
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