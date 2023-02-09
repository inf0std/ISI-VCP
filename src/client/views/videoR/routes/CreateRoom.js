import React,{useRef, useContext,useState} from 'react'
import {IoVideocam} from "react-icons/io5"
import {useNavigate }from"react-router-dom"
import {v1} from "uuid"
import {RoomContext} from './RoomContext'

export default function CreateRoom() {
    const navigate = new useNavigate()
    const Name = useRef()
    const [ido,setidos] = useState()
    const create = () => {
        const id = v1()
        const data = {
            roomId : id,
            name : Name.current
        }
        navigate(`room/${id}`)

    }
    const join = () => {
        const data = {
            name : Name.current
        }
        navigate(`room/${ido}`)

    }
  return (
    <div>
      <br/><br/>
    <div className="container">
            <label className="label">username</label>
            <input  placeholder="username" type="text" className="input" onChange={(e)=>Name.current = e.target.value} />
         
          <button onClick={create} className="btn btn-primary">
              <IoVideocam className="icon"/>
              <span className="btn">new meet</span>
            </button>
    </div>
    <br/><br/><br/><br/>
    <div className="container">
    <label className="label">roomID</label>
            <input  placeholder="username" type="text" className="input" onChange={(e)=>setidos(e.target.value) } />
            <br/>
            <label className="label">username</label>
            <input  placeholder="username" type="text" className="input" onChange={(e)=>Name.current = e.target.value} />
         
          <button onClick={join} className="btn btn-primary">
              <IoVideocam className="icon"/>
              <span className="btn">new meet</span>
            </button>
    </div>
    </div>
  )
}
