import react from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Cnx.css';

function BasicExample() {
  return (
    <body >
      <header>
        <div className='container'>


          <Form>
            <div>
              <h3>login</h3>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>


            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>

          <div />
        </div>
      </header >
    </body>
  );
};

export default BasicExample;