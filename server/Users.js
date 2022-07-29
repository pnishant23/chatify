// file for managing users and their data

//creating array of users
let users = []
console.log(users)

//function for adding new users
const addUser = ({id, name, room}) => {
    
    name = name.trim().toLowerCase() //removing the white spaces + making all lowercase
    room = room.trim().toLowerCase() //removing the white spaces + making all lowercase
    
    //checking if user exist with same username and room name
    const existingUser = users.find(user=>user.name === room && user.room === room)
    
    //handleling the Error
    if(existingUser){
        return {error:'user name taken'}
        console.log('user exist')
    }
    
    //if user name is not taken then create the new user
    const user = {id:id, name:name, room:room}
    //updating the users array
    users.push(user)
    //returning the new user    
    return {user}
    console.log(users)
    
}

//function for removing user
const removeUser = (id) => {
    //checking if user with id exist
    const index = users.findIndex((user)=>{user.id === id})
    
    if( !index === -1 ){
        //removing the user
        return users.splice(index, 1)[0]
    }
}

//get a specific user
const getUser = (id) => users.find((user)=>user.id === id)

//how many users are there in the room
const getUsersInRoom  = (room) =>{
    users.filter((user)=>{user.room === room})
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom } 