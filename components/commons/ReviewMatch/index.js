import { AVATAR, AVATAR_TEAM, MATCH_API } from '../../../config/config'
import styles from './styles.module.scss'
import { useState } from 'react'
import { Modal } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { setMessage } from '../../../slices/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function ReviewMatch({ show, setShow, match_id, setDel }) {
    const [result, setResult] = useState('0 - 0');
    const [ratingTeam, setRatingTeam] = useState(0);
    const [members, setMembers] = useState([]);
    const [match, setMatch] = useState();
    const dispatch = useDispatch();
    const token = useSelector(state=>state.token);

    function handleResult(event)
    {
        var results = result.split(' - ');
        if(event.target.name === 'result_1'){
            results[0] = event.target.value
        }else{
            results[1] = event.target.value
        }
        results = results.join(' - ');
        console.log(results);
        setResult(results);
    }

    function handleRatingTeam(newRating)
    {
        console.log(newRating);
        setRatingTeam(newRating);
    }

    function handleRatingMember(newRating, user_id)
    {
        console.log(newRating);
        let arr = members;
        arr[user_id] = newRating;
        setMembers(arr);
    }

    function handleSubmit(event) {
        event.preventDefault()
        let formData = new FormData();
        formData.append('result', result);
        formData.append('rating_team', ratingTeam);
        formData.append('members', members);

        axios.post(MATCH_API + `${match_id}/review/member`, formData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setShow(false);
            setDel(true);
        }).catch(error=>{
            openMessageBox(error.response.data.message);
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    useEffect(()=>{
        axios.get(MATCH_API + `${match_id}/review/member`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setMatch(response.data.data);
        }).catch(error=>{
            openMessageBox(error.response.data.message);
        })
    })

    return (
        <Modal className={styles.modal_container} show={show} onHide={() => setShow(false)}>
            <Modal.Header className={styles.header} closeButton>
                <Modal.Title className={styles.title}>Review Match</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.result}>
                        <h5>Result </h5>
                        <input name="result_1" value={result.split(' - ')[0]} onChange={handleResult}></input>
                        <span>:</span>
                        <input name="result_2" value={result.split(' - ')[1]} onChange={handleResult}></input>
                    </div>
                    <div className={styles.team}>
                        <h5>Review Opponent Team</h5>
                        <div className={styles.item}>
                            <div className={styles.name}>
                                <img src={match.team_avatar == null ? AVATAR_TEAM : HOST + match.team_avatar}></img>
                                <span className={styles.text}>{match.team_name}</span>
                            </div>
                            <ReactStars
                                count={5}
                                size={15}
                                activeColor="#ffd700"
                                onChange={handleRatingTeam}
                            />

                        </div>
                    </div>
                    <div className={styles.member}>
                        <h5>Review Member</h5>
                        {match !== undefined ? match.members.map((element,key)=>{
                            let src = element.avatar == null ? AVATAR : HOST + element.avatar;
                            return (
                                <div className={styles.item} key={key}>
                                    <div className={styles.name}>
                                        <img src={src}></img>
                                        <span className={styles.text}>{element.name}</span>
                                    </div>
                                    <ReactStars
                                        count={5}
                                        size={15}
                                        activeColor="#ffd700"
                                        onChange={(newRating)=>handleRatingMember(newRating, element.id)}
                                    />
                                </div>
                            )
                        }) : ''}
                    </div>
                    <button type="submit" className={styles.btnSubmit}>Submit</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}