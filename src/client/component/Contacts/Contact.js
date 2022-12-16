import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import './Contact.css'
function Contact(props) {
    return (

        <div className='contactes'>
            <div className='prop'>
                <Form>
                    <h1 className='titre'> Contacts</h1>
                    <Form.Group className="mb-31" controlId="exampleForm.ControlInput1">
                        <Form.Label></Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-31" controlId="formBasicName">
                        <Form.Label></Form.Label>
                        <Form.Control type="email" placeholder="Object" />
                    </Form.Group>
                    <Form.Group className="mb-31" controlId="exampleForm.ControlTextarea1">
                        <Form.Label></Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Message" />
                    </Form.Group>
                </Form>
                <Button variant="outline-info" className='Button'>Envoyer</Button>{' '}
            </div>
        </div>


    );
}

export default Contact;