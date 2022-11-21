//veillez definir les parametres necessaire pour vous requete
// file containing the CRUD API

//create operation
createUser = async(newemail,newpassword)=>{


  
    const hashedPwd = await bcrypt.hash(newpassword, 10);
    console.log(hashedPwd);

    const newUser = {
        email: newemail,
        password: hashedPwd
    };
    console.log(newUser)
    try {
      //attendre Login  soit sauvgarder then create user
  const saveUser = await User.create({
    login: newUser,isadmin:false,
  });
  return(saveUser);
   
  } catch (e) {
    console.log(e)
    
    }
  
  }
createConversation = ()=>{ }
createOrganization = ()=>{ }
createReunion = ()=>{ }
createConference = ()=>{ }
createDebate = ()=>{ }

//Read operations
readUser = ()=> { }
readConversation = ()=> { }
readOrganization = ()=> { }
readReunion = ()=> { }
readConference = ()=> { }
readDebate = ()=> { }

//update operation
updateUser = ()=> { }
updateConversation = ()=> { }
updateOrganization = ()=> { }
updateReunion = ()=> { }
updateConference = ()=> { }
updateDebate = ()=> { }

//delete operation
deleteUser = ()=> { }
deleteConversation = ()=> { }
deleteOrganization = ()=> { }
deleteReunion = ()=> { }
deleteConference = ()=> { }
deletedebate = ()=> { }