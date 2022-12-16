import React from 'react';
import './Header.css'
import Card from 'react-bootstrap/Card';
function Header(props) {
    return (
        <div className='header01'>
            <div className='div1'>
                <Card border="info" style={{ width: '30rem', height:'15rem' }}>
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                        <Card.Title>Info Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className='div2'>

                <>
                    {[
                        'Secondary',
                    ].map((variant) => (
                        <Card
                            bg={variant.toLowerCase()}
                            key={variant}
                            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                            style={{ width: '30rem' ,height:'13rem' }}
                            className="mb-21"
                        >
                            <Card.Header>Header</Card.Header>
                            <Card.Body>
                                <Card.Title>{variant} Card Title </Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </>



            </div>
            <div className='div3'>

                <>
                    {[

                        'Light',

                    ].map((variant) => (
                        <Card
                            bg={variant.toLowerCase()}
                            key={variant}
                            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                            style={{ width: '25rem',height:'10rem'  }}
                            className="mb-2"
                        >
                            <Card.Header>Header</Card.Header>
                            <Card.Body>
                                <Card.Title>{variant} Card Title </Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </>
            </div>
        </div>
    );
}

export default Header;