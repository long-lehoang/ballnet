import { useState } from 'react';
import styles from './styles.module.scss';
//TODO
export default function MyBookingPage({booking}){
    const[data, setData] = useState([]);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>My Booking</h3>
            <hr></hr>
            <table>
                <tr>
                    <th>Stadium</th>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Booking time</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>Phu Tho</td>
                    <td>7 vs 7</td>
                    <td>18:00-19:30 22/12/2020</td>
                    <td>400000 VND</td>
                    <td>Processing</td>
                    <td>19:30 20/12/2020</td>
                    <td><button>Cancel</button></td>
                </tr>
                {
                    data.map(element=>{
                        return(
                            <tr>

                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}