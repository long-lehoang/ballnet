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
import { useSelector } from "react-redux";

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
    onSubmit: null,
}

export default function LoginForm(props){
    const error = useSelector(state => state.loginError);

    const { initialValues } = props;

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('This field is required.'),
    
        password: Yup.string().required('This field is required.')

    });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}
        >
            {formikProps => {
                const {values, errors, touched} = formikProps;
                console.log({values, errors, touched});

                return (
                    <div className={styles.container}>
                        <div className={styles.button}>
                            <button className={styles.sign_in}>Sign in</button>
                            <Link href="/signup"><button className={styles.sign_up}>Sign up</button></Link>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.title}>
                                Sign in
                                <hr/>
                            </div>
                            {error && <p>Login Failed</p>}
                            <Form className={styles.form}>
                                <FastField
                                    name="username"
                                    component={InputField}

                                    label="Username"
                                    placeholder="Enter Username"
                                />
                                <FastField
                                    name="password"
                                    component={InputField}
                                    type="password"
                                    label="Password"
                                    placeholder="Enter Password"
                                />
                                
                                <FormGroup as={Row} controlId="formHorizontalCheck">
                                    <Col xs={5} className={styles.checkbox}>
                                        <FastField
                                            name="remember"
                                            component={CheckField}
                                            type="checkbox"
                                            label="Remember Me"
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <Link href="/forget_password">
                                            <a>Forget Password?</a>
                                        </Link>
                                    </Col>
                                </FormGroup>

                                <FormGroup as={Row}>
                                    <Col sm={6}>
                                        <Button size="lg" variant="danger" type="submit">Sign in</Button>
                                    </Col>
                                </FormGroup>
                            </Form>                            
                            <div className={styles.btn_gg}>
                                <Button variant="outline-secondary" block>
                                    <FontAwesomeIcon className={styles.icon_gg} icon={faGoogle}/>Login with Google
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
}