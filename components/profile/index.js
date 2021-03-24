import styles from './styles.module.scss';
import StadiumSuggest from '../commons/StadiumSuggest';
import MatchSuggest from '../commons/MatchSuggest';
import InfoComponent from './InfoComponent';
import Feed from './Feed';
import Info from './Info';
import Stadium from './Stadium';
import Team from './Team';
import Match from './Match';
import Friend from './Friend';

import { useState } from 'react';
import loadStar from '../../lib/star';

function loadComponent(option){
    switch (option){
        case 1:
            return (<Feed></Feed>)
        case 2:
            return (<Info></Info>)
        case 3:
            return (<Team></Team>)
        case 4:    
            return (<Friend></Friend>)
        case 5:
            return (<Match></Match>)
        case 6:
            return (<Stadium></Stadium>)
        default:
            return (<Feed></Feed>)
    }
}

export default function Profile(){
    const [option, setOption] = useState(1);
    const [status, setStatus] = useState("Status asasdadadadaasd");
    const [name, setName] = useState("Le Hoang Long");
    const [points , setPoints] = useState(5);
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <img src="/cover.jpg" className={styles.cover}></img>
                <button className={styles.btnChange}>Change</button>
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.item}>
                        <InfoComponent></InfoComponent>
                    </div>
                    <div className={styles.item}>
                        <StadiumSuggest></StadiumSuggest>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <span className={styles.name}>{name}</span>
                        <div className={styles.info}>
                            <span className={styles.status}>{status}</span>
                            <div className={styles.star}>
                                {loadStar(points,15)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <button onClick={()=>setOption(1)}>Feed</button>
                        <button onClick={()=>setOption(2)}>Info</button>
                        <button onClick={()=>setOption(3)}>Teams</button>
                        <button onClick={()=>setOption(4)}>Friends</button>
                        <button onClick={()=>setOption(5)}>Matchs</button>
                        <button onClick={()=>setOption(6)}>Stadiums</button>
                    </div>
                    {loadComponent(option)}
                </div>
                <div className={styles.right}>
                    <button className={styles.btnSetting}>Setting</button>
                    <div className={styles.component}>
                        <MatchSuggest></MatchSuggest>
                    </div>
                </div>
            </div>
        </div>
    )
}