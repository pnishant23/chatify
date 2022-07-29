// importing all the modules
const http = require("http")
const express = require("express")
const cors = require("cors")
const socketIO = require("socket.io")
const router = require('./router')

//importing the users modules
const {addUser, removeUser, getUser, getUsersInRoom} = require('./Users')

//creating an instance of express
const app = express()

//creating server and passing the app to it
const server = http.createServer(app)

//creating instance of server also passing the cors
const io = socketIO(server, {
    cors:{
        origin:'http://localhost:3001',
        method:['GET', 'POST'],
    }
})

//initializing the port at which the server will running
const PORT = 5001 || process.env.PORT 


io.on('connection', (socket)=>{
    console.log(socket.id, 'socket id on connection')
    socket.on('join', ({name, room}, callback)=>{

        const {error, user} = addUser({id:socket.id, name, room})
        //handling error
        if(error){
            return callback(error)
        }
        
        
        socket.emit('message', {user:'admin', text:`${user.name} welcome to room ${user.room}`})
        
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined !`})
        
        //socket.io method to join a user in a room
        socket.join(user.room)
        
        callback()
    })
    
    //user generated msgs
    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)
        console.log(user, 'user const')
        io.to(user.room).emit('message', {user:user.name, text:message})
    })
    
    socket.on('disconnect', ()=>{
        console.log('user left')
    })
})

// const corsOptions = {
//     Origin:'http://localhost:3000/',
//     optionsSuccessStatus:200,
// }

//normally creating the routing
app.get("/", (req, res)=>{
    res.send(`server is live at and running`)
})
// console.log(cors)
// app.use(cors({
//     origin:'*',
//     optionsSuccessStatus:200,
// }))

//callling router as middle ware which isn't working
// app.use(router, (req, res)=>{
//     console.log('middle are func worked !')
// })

// server.listen(PORT, call back func)
server.listen(PORT, ()=>console.log(`server running at http://localhost:${PORT}`))




























// //storing users id as Object
// const users = [{}]

// app.get("/", (req, res)=>{
//     res.send(`server is live at ${port}`)
// })

// io.on("connection", (socket)=>{
//     console.log("newconnection successul from server")
//     //receiving the user email from client 
//     socket.on("joined", ({userEmail})=>{
//         //storing the email in object
//         users[socket.id] = userEmail
//         console.log(`${userEmail} has joined`)
//         //transferign welcome message to client
//         socket.emit("welcome", {
//             user:'Admin',
//             message:`welcome to the chat ${users[socket.id]}`
//         })
//         //telling users that a new user has joined
//         socket.broadcast.emit("userJoined",{
//             user:"Admin",
//             message:`Caution ${users[socket.id]} has joined`
//         })
        
//     })
    
//     socket.on("message", (message, id)=>{
//         io.emit("sendMsg", {user:users[id], message, id})
//     })
    
//     socket.on("disconnect", ()=>{
//         socket.broadcast.emit("userLeft", {
//             user:"admin",
//             message:`${users[socket.id]} has left`
//         })
//         console.log(`${users[socket.id]} has left`)
//     })
// })

// //
// server.listen(port, ()=>{
//     console.log(`server is running at port http://localhost:${port}`)
// })