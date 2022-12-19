

function NavBar() {
    return ( 
        <nav className="navbar navbar-expand-lg border" style={{margin:0, padding:'1px'}}>
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
            <div className="d-flex flex-row-reverse" style={{width:'100%',margin:'3px',padding:'10px 0px'}}>
                <button className='btn btn-outline float-right' style={{padding:'0px 20px', fontSize:'20px'}} type=""><i style={{color:'#1dde94'}} class="bi bi-three-dots-vertical"></i></button>
                <button className='btn btn-outline float-right' style={{padding:'0px 20px', fontSize:'20px'}} type=""><i style={{color:'#1dde94'}} class="bi bi-camera-video-fill"></i></button>
                <button className='btn btn-outline float-right' style={{padding:'0px 20px', fontSize:'20px'}} type=""><i style={{color:'#1dde94'}} class="bi bi-telephone-fill"></i></button>
            </div>
        </nav>
     );
}

export default NavBar;