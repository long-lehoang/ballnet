import axios from "axios";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { RESET_PASSWORD_API } from "../../config/config";
import { setLoading } from "../../slices/loadingSlice";
import { setMessage } from "../../slices/messageSlice";
import styles from "./styles.module.scss";

export default function ForgetPasswordForm() {
    const [email, setEmail] = useState('')
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch()

    function validate()
    {
        return email !== '' && validateEmail(email)
    }
    
    function handleSubmit()
    {
        dispatch(setLoading(true));
        let formData = new FormData();
        formData.append('email', email);

        axios.post(RESET_PASSWORD_API, formData).then(response=>{
            dispatch(setLoading(false));
            openMessageBox(response.data.message, 'Success');
        }).catch(error=>{

            dispatch(setLoading(false));
            openMessageBox(error.response.data.message);
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
      
    useEffect(()=>{
        setCheck(validate());
    })
    return (
        <div className={styles.container}>
            <h3><FormattedMessage id="Forget Password" /></h3>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={"Email"}></input>
            {check ? <button onClick={handleSubmit}><FormattedMessage id="Submit" /></button>:
            <button className={styles.disabled}><FormattedMessage id="Submit" /></button>}
        </div>
    )
}