import styles from "./styles.module.scss";
import {Row, Col, Button, FormGroup} from 'react-bootstrap';
import Link from 'next/link';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import InputField from '../commons/custom-fields/InputField';

SignupForm.propTypes = {
    onSubmit: PropTypes.func,
};

SignupForm.defaultProps = {
    onSubmit: null,
}

export default function SignupForm(props){
    const { initialValues } = props;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        username: Yup.string().required('This field is required.'),
        email: Yup.string().required('This field is required.'),
        password: Yup.string().required('This field is required.'),
        c_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

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
                            <Link href="/login"><button className={styles.sign_in}>Sign in</button></Link>
                            <button className={styles.sign_up}>Sign up</button>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.title}>
                                Sign up
                                <hr/>
                                <span>{props.error}</span>
                            </div>
                            <Form className={styles.form}>
                                <FastField
                                    name="name"
                                    component={InputField}

                                    placeholder="Enter FullName"
                                />
                                <FastField
                                    name="email"
                                    component={InputField}
                                    type="email"
                                    placeholder="Enter Email"
                                />
                                <FastField
                                    name="username"
                                    component={InputField}

                                    placeholder="Enter Username"
                                />
                                <FastField
                                    name="password"
                                    component={InputField}
                                    type="password"
                                    placeholder="Enter Password"
                                />
                                <FastField
                                    name="c_password"
                                    component={InputField}
                                    type="password"
                                    placeholder="Repeat Password"
                                />
                                <FormGroup as={Row}>
                                    <Col sm={6}>
                                        <Button size="lg" variant="danger" type="submit">Sign up</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    )
                }}
        </Formik>
    )
}