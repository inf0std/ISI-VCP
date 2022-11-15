const socketIo = require('socketio')


module.exports = (server, config) =>{

    var io = socketIo.listen(server);

    io.on('connection', (socket)=>{

        //envoie de message
        socket.on('msg', data =>{
            
        })

        //rejoindre une reunion, conversation, conf, debat
        socket.on('join', data =>{

        })

        //quitter une reunion, conversation, conf, debat
        socket.on('leave', data =>{
            
        })
    });
}