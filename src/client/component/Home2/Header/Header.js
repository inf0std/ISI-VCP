import React from 'react';
import './Header.css'
import Card from 'react-bootstrap/Card'
import img from "./userProfile.jpg"
function Header(props) {
    return (
        <div className='header'>
            <div className='head1'>
                <div className='col-md-6 offset-1'>
                    <div className="card mb-8" >
                        <div className="row g-0">

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <img src={img} className="img-fluid rounded-start" alt="..." />
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                </div>
                <div className='head2'>
                    <div className="col-md-3 offset-8">
                        <div className="col">
                            <div className="card">
                                <img src={img} className="img-fluid rounded-start" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='head3'>

                <div className='col-md-6 offset-1'>
                    <div className="card mb-8" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={img} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Header;