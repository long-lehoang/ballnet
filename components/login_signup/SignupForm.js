import styles from "./signup.module.scss";
import {Form, Row, Col, Button} from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function SignupForm(){
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
                </div>
                <Form className={styles.form}>
                    <Form.Group controlId="formGroupName">
                        <Form.Control type="text" placeholder="Enter Full Name" />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Control type="email" placeholder="Enter Email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupUser">
                        <Form.Control type="text" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword2">
                        <Form.Control type="password" placeholder="Repeat Password" />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={6}>
                            <Button size="lg" variant="danger" type="submit">Sign up</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}