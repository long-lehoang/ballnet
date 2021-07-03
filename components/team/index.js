import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { AVATAR_TEAM } from '../../config/config';
import Loading from '../commons/Loading';
import Filter from './filter'
import Item from './Item'
import styles from './styles.module.scss'
import CreateTeamForm from '../commons/CreateTeamForm'

export default function Team({team})
{
    const [list, setList] = useState(team||[]);
    const [show, setShow] = useState(false);

    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Teams" /></h3>
            <div className={styles.filter}>
                <Filter team={team} setTeam={setList} result={list}/>
            </div>
            <div className={styles.lists}>
                <CreateTeamForm show={show} setShow={setShow} teams={list} setTeams={setList}></CreateTeamForm>
                <div className={styles.addComp} onClick={()=>setShow(true)}>
                    <img src={AVATAR_TEAM}></img>
                    <button>+</button>
                    <span><FormattedMessage id="Add" /></span>
                </div>
                {
                    list.map((item, key)=>{
                        return(
                            <LazyLoad key={key} height={200} placeholder={<Loading/>}>
                                <Item item={item} key={key}/>
                            </LazyLoad>
                        )
                    })
                }
            </div>
        </div>
    )
}