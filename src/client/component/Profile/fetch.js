
User.findOne({name : 'smith'}).populate('contacts').exec((error,user)=>{
	if (error){
	  console.error(error)
	}else{
	  console.log(user.contacts)
	}
  });
  