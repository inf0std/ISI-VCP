const users =[];

const addUser =({id,name,room})=>{
    name = name.tirm().toLowerCase();
    room  = room.tirm().toLowerCase();


 // verifier l'existance de users dans la meme room avec le meme nom

 const existingUser = users.find((user)=> user.room === room && user.name === name);
  if (existingUser) {
    return{ error: 'Username is taken'}; 
  }

  //si non cree un nv user
  const user = { id, name, room };
  users.push(user);
  return{user}

}
const removeUser =(id)=> {
    const index =users.findIndex((user)=> user.id ===id);
    if (index !==-1){
        return users.splice(index,1)[0];
    }

}

const getUser = (id) => users.find((user )=>user.id ===id);



const getUsersInRoom =(room)=> users.filter((user)=>user.room === room);


module.exports ={addUser,removeUser,getUser,getUsersInRoom};