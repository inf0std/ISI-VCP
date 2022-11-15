import React from 'react'
import Msg from '../msg/Msg.js'

const MessagesTab = (props)=>{
    return (<div>
        { console.log(props.msgs)}
       { props.msgs.map((m) => <Msg msg = {m}/>)}
    </div>)
}

export default MessagesTab;