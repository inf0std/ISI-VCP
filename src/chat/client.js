const socket = io("http://localhost:5000");
const messageform = document.querySelector(".chatbox form");
const messageList = document.querySelector("#messagelist");
const userList = document.querySelector("ul#users");
const chatboxinput = document.querySelector(".chatbox input");
const  messages = []
//socket listeners

socket.on("message_client", (message) => {
    messages.push(message);
    updateMessages()
})
//event listeners
messageform.addEventListener('submit', messageSubmitHandler)
function messageSubmitHandler(e) {
    e.preventDefault();
    let message = chatboxinput.value;
    if(!message){
        return alert ("Message must not be empty");
    }

    socket.emit("message", message)

    chatboxinput.value = ""


}


function updateMessages() {
    messageList.textContent = ''
    for (let i = 0; i < messages.length; i++) {
        messageList.innerHTML += `<li>
                     <p>${messages[i].message}</p>
        
                       </li>`
    }
}
