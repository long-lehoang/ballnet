import styles from './styles.module.scss';
import CreateTeamForm from '../../commons/CreateTeamForm'
import axios from 'axios';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Loading from '../../commons/Loading';
import { MY_TEAM_API, POSTS_API, TEAM_API } from '../../../config/config';
import { useSelector } from 'react-redux';
import Item from './Item';

export default function Team({permission}) {
    const token = useSelector(state => state.token)
    const [teams, setTeams] = useState([]);

    useEffect(()=>{
        axios.get(MY_TEAM_API, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setTeams(response.data.data)
        }).catch((error) => {
            console.log(error);
        })

    },[null])

    return (
        <div className={styles.container}>
            {permission ? <div className={styles.row}>
                <CreateTeamForm></CreateTeamForm>
            </div> : ''}
            <div className={styles.list}>
            {teams.map((element, key) => {
                return (
                    <LazyLoad key={key} height={200} placeholder={<Loading />}>
                        <Item key={key} item={element}></Item>
                    </LazyLoad>
                )
            })}
            </div>
        </div>
    )
}