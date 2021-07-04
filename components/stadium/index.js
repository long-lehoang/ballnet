import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { AVATAR_TEAM } from '../../config/config';
import CreateStadiumForm from '../commons/CreateStadiumForm';
import Loading from '../commons/Loading';
import Item from '../commons/Stadium';
import Filter from './filter'
import styles from './styles.module.scss'

export default function Stadium({stadium})
{
    const [list, setList] = useState(stadium||[]);
    const [show, setShow] = useState(false);

    return(
        <div className={styles.container}>
            <h3><FormattedMessage id="Stadiums" /></h3>

            <div className={styles.filter}>
                <Filter stadium={stadium} setStadium={setList} result={list}/>
            </div>
            <div className={styles.lists}>
                <CreateStadiumForm show={show} setShow={setShow} stadium={list} setStadium={setList}></CreateStadiumForm>
                <div className={styles.addComp} onClick={()=>setShow(true)}>
                    <img src={AVATAR_TEAM}></img>
                    <button>+</button>
                    <span><FormattedMessage id="Add" /></span>
                </div>
                {
                    list.map((item, key)=>{
                        return(
                            <LazyLoad key={item.id} height={200} placeholder={<Loading/>}>
                                <Item item={item} key={item.id}/>
                            </LazyLoad>
                        )
                    })
                }
            </div>
        </div>
    )
}