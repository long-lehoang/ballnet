import { useState } from 'react';
import ReviewMatch from '../commons/ReviewMatch';
import Filter from './Filter'
import Item from './Item'
import styles from './styles.module.scss'
export default function Match({match})
{
    const [list, setList] = useState(match||[]);
    const [show, setShow] = useState(false);
    return(
        <div className={styles.container}>
            <ReviewMatch show={show} setShow={setShow} match_id={3}></ReviewMatch>
            <h3>Matches</h3>
            <div className={styles.filter}>
                <Filter match={match} setMatch={setList} result={list}/>
            </div>
            <button onClick={()=>setShow(true)}>Test Review Match</button>
            <div className={styles.lists}>
                {
                    list.map((item, key)=>{
                        return(
                            <Item item={item} key={key}/>
                        )
                    })
                }
            </div>
        </div>
    )
}