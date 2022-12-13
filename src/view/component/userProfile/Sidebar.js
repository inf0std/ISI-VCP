import React from "react"
import './Sidebar.css'
import { Avatar } from "@mui/material";

export default function Sidebar(){
    return(
    <div className="sidebar">
        <div className="sidebar_top">
            <Avatar className='sidebar_avatar' />
            <h1>zaza h.h</h1>
            <h3>zaza.hh@gmail.com</h3>
            <div className="sidebar_stat">
                <p>Profession:</p>
            </div>
            <div className="addcont">
            <i class="bi bi-person-plus-fill " title="Add new contact"></i>
            <button className="btn">My contacts</button>
            </div>
            
        </div>

    </div>
    )
}
