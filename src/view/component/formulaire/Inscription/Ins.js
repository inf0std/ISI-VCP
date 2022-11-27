
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Ins.css';

function Basicexample() {
    return (
        <body >
            <header>
                <div className='container'>


                    <Form>
                        <div>
                            <h3>login up</h3>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter Name" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Firt Name </Form.Label>
                            <Form.Control type="email" placeholder="Enter first Name" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm your password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <br />
                            <Form.Label>LogIn</Form.Label>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Valid
                        </Button>
                    </Form>
                    <div />

                </div>


                <p className='para'>If you have an acount <a href="" target="_blank">Log In</a></p>
            </header >
        </body>
    );
};

export default Basicexample;