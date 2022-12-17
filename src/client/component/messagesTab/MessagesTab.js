import React from 'react'
import Msg from '../msg/Msg'

const MessagesTab = (props)=>{
    return (<div>
        { console.log(props.msgs)}
       { props.msgs.map((m) => <Msg key={m} msg = {m}/>)}
    </div>)
}

export default MessagesTab;