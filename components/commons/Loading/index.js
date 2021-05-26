import { FormattedMessage } from 'react-intl'
import styles from './styles.module.scss'
export default function Loading(){
    return(
        <div className={styles.container }>
            <FormattedMessage id="Loading" />...
        </div>
    )
}