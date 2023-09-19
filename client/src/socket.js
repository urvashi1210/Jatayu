import io from 'socket.io-client';

const socket = io('http://localhost:4000/socket'); // Replace with your socket server URL

socket.on("connect",()=> {
    appendMessage(`Connected with id : ${socket.id}`)
    socket.emit('custom-event', 10, 'a', {Hello : "jack"})
    })
export default socket;