import { useState } from 'react';
import Filter from './Filter'
import Item from '../commons/MatchItem'
import styles from './styles.module.scss'
import LazyLoad from 'react-lazyload';
import Loading from '../commons/Loading';
import { FormattedMessage } from 'react-intl';
import SelectTeam from './SelectMyTeam';
import CreateMatchForm from '../commons/CreateMatchForm';
import { AVATAR_TEAM } from '../../config/config';

export default function Match({match})
{
    const [list, setList] = useState(match||[]);
    const [team, setTeam] = useState();
    const [showSelectTeam, setShowSelectTeam] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Matches" /></h3>
            <div className={styles.filter}>
                <Filter match={match} setMatch={setList} result={list}/>
            </div>
            <div className={styles.lists}>
                <SelectTeam team={team} setTeam={setTeam} show={showSelectTeam} setShow={setShowSelectTeam} setShowCreate={setShowCreate} ></SelectTeam>
                { team != undefined ? <CreateMatchForm show={showCreate} setShow={setShowCreate} team={team} matchs={list} setMatchs={setList}></CreateMatchForm> : ''}
                <div className={styles.addComp} onClick={()=>setShowSelectTeam(true)}>
                    <img src={AVATAR_TEAM}></img>
                    <button>+</button>
                    <span><FormattedMessage id="Add" /></span>
                </div>
                {
                    list.map((item, key)=>{
                        return(
                            <LazyLoad key={key} height={200} placeholder={<Loading/>}>
                                <Item item={item} key={item.id}/>
                            </LazyLoad>
                        )
                    })
                }
            </div>
        </div>
    )
}