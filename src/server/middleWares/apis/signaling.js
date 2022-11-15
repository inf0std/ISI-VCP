const { useId } = require('react');
const { useImperativeHandle } = require('react');
const socketIo = require('socketio')


module.exports = (server, config) =>{

    var io = socketIo.listen(server);

    io.on('connection', (socket)=>{

        socket.on('', ()=>{

        })
        //user userId joines conversation convId
        socket.on('joinConv', data=>{
            var { useId, convId } = data; 
            //traitment
        })

        socket.on('joinConf', data=>{
            var { userId, confId} = data;
            //traitment
        })

        //rejoindre une reunion, conversation, conf, debat
        socket.on('join', data =>{

        })

        //quitter une reunion, conversation, conf, debat
        socket.on('leave', data =>{
            
        })
    });
}