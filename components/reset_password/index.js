import axios from "axios";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { RESET_PASSWORD_API } from "../../config/config";
import { setLoading } from "../../slices/loadingSlice";
import { setMessage } from "../../slices/messageSlice";
import styles from "./styles.module.scss";

export default function ResetPasswordForm({token}) {
    const [pw1, setPw1] = useState('')
    const [pw2, setPw2] = useState('')
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    function validate()
    {
        return pw1 === pw2 && pw1 !== ''
    }
    function handleSubmit()
    {
        dispatch(setLoading(true));
        let formData = QueryString.stringify({
            password: pw1,
        })
        axios.put(RESET_PASSWORD_API + token, formData).then(response=>{
            dispatch(setLoading(false));
            router.push('/login');
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

    useEffect(()=>{
        setCheck(validate());
    })
    return (
        <div className={styles.container}>
            <h3><FormattedMessage id="Reset Password" /></h3>
            <input type="password" value={pw1} onChange={(e)=>setPw1(e.target.value)} placeholder={"Mật khẩu mới"}></input>
            <input type="password" value={pw2} onChange={(e)=>setPw2(e.target.value)} placeholder={"Nhập lại mật khẩu"}></input>
            {check ? <button onClick={handleSubmit}><FormattedMessage id="Submit" /></button>:
            <button className={styles.disabled}><FormattedMessage id="Submit" /></button>}
        </div>
    )
}