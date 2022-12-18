import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Inscription.css';

function Inscription() {
    return (
        <div className='formular'>

            <Form>
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label=" accept Terms of legacy " />
                </Form.Group>
                <Button id="validerbtn" variant="info" type="submit" className='vandam'>
                    Valid
                </Button>
            </Form>
            <div />
        </div>

    );
};

export default Inscription;