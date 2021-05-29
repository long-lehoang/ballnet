import styles from "./styles.module.scss";
import { FastField, Form, Formik } from 'formik';
import { Row, Col, Button, FormGroup, FormCheck } from "react-bootstrap";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import InputField from '../commons/custom-fields/InputField';
import CheckField from '../commons/custom-fields/CheckField';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { LOGIN_API } from "../../config/config";
import axios from 'axios';
import { setError } from "../../slices/loginErrorSlice";
import { setUser } from "../../slices/infoUserSlice";
import { useCookies } from "react-cookie"
import { FormattedMessage } from "react-intl";

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
    onSubmit: null,
}

export default function LoginForm(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cookie, setCookie] = useCookies(["user"])

    const handleSubmit = (values) => {

        axios.post(LOGIN_API, values)
            .then((response) => {
                // Code for handling the response 
                // save token
                if (response.data.success) {
                    const time = new Date(response.data.data.expires_at)
                    setCookie("user", JSON.stringify(response.data.data), {
                        path: "/",
                        expires: time,
                        sameSite: true,
                    })
                    const actionUser = setUser(response.data.data.user);
                    dispatch(actionUser);
                    const actionError = setError(false);
                    dispatch(actionError);
                    router.push('/');
                } else {
                    const actionError = setError(true);
                    dispatch(actionError);
                }

            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    const actionError = setError(true);
                    dispatch(actionError);
                    console.log(error.response.data)
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    const actionError = setError(true);
                    dispatch(actionError);
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    const actionError = setError(true);
                    dispatch(actionError);
                    console.log(error.message)
                }
            })
    }
    const initialValues = {
        username: '',
        password: '',
        remember: false
    }
    const error = useSelector(state => state.loginError);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('This field is required.'),

        password: Yup.string().required('This field is required.')

    });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formikProps => {
                const { values, errors, touched } = formikProps;
                return (
                    <div className={styles.container}>
                        <div className={styles.button}>
                            <button className={styles.sign_in}><FormattedMessage id="Sign in" /></button>
                            <Link href="/signup"><button className={styles.sign_up}><FormattedMessage id="Sign up" /></button></Link>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.title}>
                                <FormattedMessage id="Sign in" />
                                <hr />
                            </div>
                            {error && <p><FormattedMessage id="Login failed" /></p>}
                            <Form className={styles.form}>
                                <FastField
                                    name="username"
                                    component={InputField}

                                    label={<FormattedMessage id="Username" />}
                                    placeholder={"Nhập tên đăng nhập"}
                                />
                                <FastField
                                    name="password"
                                    component={InputField}
                                    type="password"
                                    label={<FormattedMessage id="Password" />}
                                    placeholder={"Nhập mật khẩu"}
                                />

                                <FormGroup as={Row} controlId="formHorizontalCheck">
                                    {/* <Col xs={5} className={styles.checkbox}>
                                        <FastField
                                            name="remember"
                                            component={CheckField}
                                            type="checkbox"
                                            label="Remember Me"
                                        />
                                    </Col> */}
                                    <Col xs={6}>
                                        <Link href="/forget_password">
                                            <a><FormattedMessage id="Forget Password?" /></a>
                                        </Link>
                                    </Col>
                                </FormGroup>

                                <FormGroup as={Row}>
                                    <Col sm={8}>
                                        <Button size="lg" variant="danger" type="submit"><FormattedMessage id="Sign in" /></Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                            <div className={styles.btn_gg}>
                                <Button variant="outline-secondary" block>
                                    <FontAwesomeIcon className={styles.icon_gg} icon={faGoogle} /><FormattedMessage id="Login with Google" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
}