
const socket = io("http://localhost:4000");
//const messageform = document.querySelector(".chatbox form");
//const messageList = document.querySelector("#messagelist");
const userList = document.querySelector("ul#users");

const  messages = []
//socket listeners
//socket.join(['room1','room2']) ;

const envoimessage = (e)=>{
 var chatboxinput=document.getElementById("chatboxinput-"+e.target.id);
 socket.emit("msg",{
    room:e.target.id,
    msg:chatboxinput.value
 })
 console.log('send message')
 e.preventDefault()
}
socket.on("msg",(data)=>
{
    room = data.room;
    messageList = document.getElementById("messageList-" +room);
    console.log("room", room);
    console.log(messageList)
    messageList.innerHTML +=`<li>
    <p>${data.msg}</p>

      </li>`
});
socket.on("message_client", (message) => {
    messages.push(message);
    updateMessages()
})
//event listeners
/*messageform.addEventListener('submit', messageSubmitHandler)
function messageSubmitHandler(e) {
    e.preventDefault();
    let message = chatboxinput.value;
    if(!message){
        return alert ("Message must not be empty");
    }

    socket.emit("message", message)

    chatboxinput.value = ""


}*/


function updateMessages() {
    messageList.textContent = ''
    for (let i = 0; i < messages.length; i++) {
        messageList.innerHTML += `<li>
                     <p>${messages[i].message}</p>
        
                       </li>`
    }
}
 
document.getElementById("room1").onclick = envoimessage; 
document.getElementById("room2").onclick = envoimessage;




