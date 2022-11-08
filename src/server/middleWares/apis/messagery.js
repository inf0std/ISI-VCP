const socketIo = require('socketio')


module.exports = (server, config) =>{

    var io = socketIo.listen(server);

    io.on('connection', (user)=>{

        //envoie de message
        user.on('msg', data =>{
            
        })

        //rejoindre une reunion, conversation, conf, debat
        user.on('join', data =>{

        })

        //quitter une reunion, conversation, conf, debat
        user.on('leave', data =>{

        })
    });
}