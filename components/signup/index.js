import styles from "./styles.module.scss";
import { Row, Col, Button, FormGroup } from 'react-bootstrap';
import Link from 'next/link';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import InputField from '../commons/custom-fields/InputField';
import { FormattedMessage } from "react-intl";

SignupForm.propTypes = {
    onSubmit: PropTypes.func,
};

SignupForm.defaultProps = {
    onSubmit: null,
}

export default function SignupForm(props) {
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
                const { values, errors, touched } = formikProps;

                return (
                    <div className={styles.container}>
                        <div className={styles.button}>
                            <Link href="/login"><button className={styles.sign_in}><FormattedMessage id="Sign in" /></button></Link>
                            <button className={styles.sign_up}><FormattedMessage id="Sign up" /></button>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.title}>
                                <FormattedMessage id="Sign up" />
                                <hr />
                            </div>
                            <Form className={styles.form}>
                                <FastField
                                    name="name"
                                    component={InputField}

                                    placeholder={"Nhập tên đầy đủ"}
                                />
                                <FastField
                                    name="email"
                                    component={InputField}
                                    type="email"
                                    placeholder={"Nhập Email"}
                                />
                                <FastField
                                    name="username"
                                    component={InputField}

                                    placeholder={"Nhập tên đăng nhập"}
                                />
                                <FastField
                                    name="password"
                                    component={InputField}
                                    type="password"
                                    placeholder={"Nhập mật khẩu"}
                                />
                                <FastField
                                    name="c_password"
                                    component={InputField}
                                    type="password"
                                    placeholder={"Nhập lại mật khẩu"}
                                />
                                <FormGroup as={Row}>
                                    <Col sm={6}>
                                        <Button size="lg" variant="danger" type="submit"><FormattedMessage id="Sign up" /></Button>
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