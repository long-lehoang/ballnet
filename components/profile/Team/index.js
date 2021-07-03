import styles from './styles.module.scss';
import CreateTeamForm from '../../commons/CreateTeamForm'
import axios from 'axios';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Loading from '../../commons/Loading';
import { AVATAR, HOST, MY_TEAM_API, POSTS_API, TEAM_API } from '../../../config/config';
import { useSelector } from 'react-redux';
import Item from './Item';
import { FormattedMessage } from 'react-intl';

export default function Team({ permission }) {
    const token = useSelector(state => state.token)
    const [teams, setTeams] = useState([]);
    const [show, setShow] = useState(false);
    const profile = useSelector(state => state.profile);

    useEffect(() => {
        axios.get(MY_TEAM_API, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setTeams(response.data.data)
        }).catch((error) => {
            console.log(error);
        })

    }, [null])

    return (
        <div className={styles.container}>
            {permission ? <div className={styles.row}>
                <div className={styles.groupAdd}>
                    <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} className={styles.avatar}></img>
                    <button className={styles.btn} onClick={() => setShow(true)}><FormattedMessage id="Create a Team" /></button>
                </div>
                <CreateTeamForm show={show} setShow={setShow} teams={teams} setTeams={setTeams}></CreateTeamForm>
            </div> : ''}
            <div className={styles.list}>
                {teams.map((element, key) => {
                    return (
                        <LazyLoad key={element.id} height={200} placeholder={<Loading />}>
                            <Item key={element.id} item={element}></Item>
                        </LazyLoad>
                    )
                })}
            </div>
        </div>
    )
}