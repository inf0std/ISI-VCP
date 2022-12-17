import React from 'react'
// import io from 'socket.io-client'
import MessagesTab from '../messagesTab/MessagesTab'

class ConversationTab extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        value:"",
        msg:[],
        msginput: null,
        socket: null //io(props.convId)
      }
      this.sendMessage = this.sendMessage.bind(this);
      this.handleOnchange =this.handleOnchange.bind(this);
    }

    sendMessage = (event) => {
      event.preventDefault()
      console.log('sending msg', this.state.value);
      this.state.msg.push(this.state.value)
      // this.state.msginput.value = '';
      this.setState({value: ''})
      console.log('messages', this.state.msg)

      //this.state.socket.emit('msg', this.state.value);
    }

    handleOnchange = (event)=>{
      this.setState({msginput: event.target})
      this.setState({value: event.target.value});
    }

    render() {
      return (
        <div>
         <MessagesTab msgs = {this.state.msg}/>
          <form >
            <input type='text' onChange={this.handleOnchange}></input>
            <button disabled={!this.state.value} onClick= {this.sendMessage}>send</button>
          </form>
        </div>
      );
    }
  }

export default ConversationTab;