import {io} from "socket.io-client"
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const roomInput = document.getElementById('room')
const joinroombutton = document.getElementById('join-room')
const messageInput = document.getElementById('message-input')
const request = document.getElementById('send-request-to-org')
const assignTeamResource = document.getElementById('assign-team-resource')
const teamGetResource = document.getElementById('team-get-resource')
console.log("Hello")
//different for different routesb
//const userSocket = io('http://localhost:3000/user', {auth: {token: 'test'}})
const socket = io('http://localhost:4000/socket')

socket.on("connect",()=> {
appendMessage(`Connected with id : ${socket.id}`)
socket.emit('custom-event', 10, 'a', {Hello : "jack"})
})

//keydown not working for some reason
document.addEventListener("keydown", e => {
  
    if(e.target === 'c')
    {
      socket.connect()
    }
    if(e.target === 'd')
    {
      socket.disconnect()
    }
  
})

let count = 0
//setInterval(() =>
//  {socket.volatile.emit('ping', ++count)}, 
//1000)

//userSocket.on(`connect_error`, error => {
//    appendMessage(error)
//})
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  const room = roomInput.value
  appendMessage(`You:- ${message}`)
  
  socket.emit('send-chat-message', message, room)
  
  messageInput.value = ''
  roomInput.value = ''
})

messageForm.addEventListener('Jack', e => {
  console.log('Baby')
})

joinroombutton.addEventListener('click', e => {
  const room = roomInput.value
  console.log("ello")
  socket.emit('join-room', room, message => {
    appendMessage(message);
  })
})

socket.on('receive-message', (message) =>{
  appendMessage(`Sender: ${message}`);
})


function appendMessage(message) {
  //socket.emit('send-message', message);
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

request.addEventListener('click', e => {
  const req = {
    senderId: `65076d45f4f23cdd493d1894`,
    teamId: "650776b466a4ecb8c4f39608",
    receiverId:"650709660473f19d86d2acae",
    message: "kill",
    status: "pending",
    estimatedAffectees: 50,
  location:{
      long:"longitude",
      lat : "latitude",
      radius:50,
  },
  };
  socket.emit('req-from-org', req, message =>{
    //this is how the data from the backend is handled
    console.log("JacksonBaby", message)
  })
})
 
assignTeamResource.addEventListener('click', e => {
  const req = {
    organisationId: `650709660473f19d86d2acae`,
    teamId: "6507115e0473f19d86d2ada4",
    resource : {
      type : "Volunteers",
      number : 5,
      organisationId :"650709660473f19d86d2acae" ,
      at : new Date(),
  }  
  };
  socket.emit('assign-team-resource', req, message =>{
    //this is how the data from the backend is handled
    console.log("JacksonBaby", message)
  })
})

teamGetResource.addEventListener('click', e => {
  const req = {
    teamId:"6507115e0473f19d86d2ada4", 
  };
  socket.emit('team-get-resource', req, message =>{
    //this is how the data from the backend is handled
    console.log("JacksonBaby", message)
  })
})

