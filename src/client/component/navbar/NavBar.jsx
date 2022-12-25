

function NavBar() {
    return ( 
        <nav className="navbar navbar-expand-lg d-flex justify-content-end border mb-5 py-1" style={{margin:0, padding:'1px'}}>
            {/* <div>
                <img 
                    style={{
                        width: "50px",
                        height: "5opx",
                        borderRadius: " 50%",
                        display: "inline-block",
                        border:'1 px black solid'
                      }}
                    src="#" alt="" />
            </div> */}
            <div className="" style={{}}>
                <button className='btn btn-outline float-right my-0' style={{padding:'0px 20px', fontSize:'20px'}} type=""><i style={{color:'#1dde94'}} class="bi bi-telephone-fill"></i></button>
                <button className='btn btn-outline float-right my-0' style={{padding:'0px 20px', fontSize:'20px'}} type=""><i style={{color:'#1dde94'}} class="bi bi-camera-video-fill"></i></button>
                <button className='btn btn-outline float-right my-0' style={{padding:'0px 20px', fontSize:'20px'}} type=""><i style={{color:'#1dde94'}} class="bi bi-three-dots-vertical"></i></button>
            </div>
        </nav>
     );
}

export default NavBar;