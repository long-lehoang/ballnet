import styles from "./login.module.scss";
import {Form, Row, Col, Button} from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginForm(){
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
                <Form className={styles.form}>
                    <Form.Group controlId="formGroupUser">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalCheck">
                        <Col xs={6}>
                            <Form.Check label="Remember me" />
                        </Col>
                        <Col xs={6}>
                            <Link href="/forget_password">
                                <a>Forget Password?</a>
                            </Link>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={6}>
                            <Button size="lg" variant="danger" type="submit">Sign in</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <div className={styles.btn_gg}>
                    <Button variant="outline-secondary" block>
                        <FontAwesomeIcon className={styles.icon_gg} icon={faGoogle}/>Login with Google
                    </Button>
                </div>
            </div>
        </div>
    )
}