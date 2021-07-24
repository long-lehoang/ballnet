import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../Filter'
import Item from '../Item'
import styles from './styles.module.scss'
export default function FriendRequest({ friendRequest }) {
    const [list, setList] = useState(friendRequest || []);

    return (
        <div className={styles.container}>
            <h3><FormattedMessage id="Friend Requests" /></h3>
            <div className={styles.filter}>
                <Filter people={friendRequest} setPeople={setList} result={list} />
            </div>
            <div className={styles.lists}>
                {
                    list.length == 0 ? <h3><FormattedMessage id="No Item" /></h3> : list.map((item, key) => {
                        item.isRequest = true;
                        return (
                            <Item item={item} key={key} />
                        )
                    })
                }
            </div>
        </div>
    )
}