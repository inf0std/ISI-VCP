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

        //user userId joines conference convId
        socket.on('joinConf', data=>{
            var { userId, confId} = data;
        })

        //user userId joines conversation convId
        socket.on('joinReun', data =>{
            var { useriD , reunId } = data;
            //traitment
        })

        //user userId joines conversation convId
        socket.on('joinDebate', data =>{
            var { userId, debateId } = data;
            //traitment
        })


        //user userId leavees conversation convId
        socket.on('leaveConv', data=>{
            var { useId, convId } = data; 
            //traitment
        })

        socket.on('leaveConf', data=>{
            var { userId, confId} = data;
            //traitment
        })

        //releavedre une reunion, conversation, conf, debat
        socket.on('leaveReun', data =>{
            var { useriD , reunId } = data;
            //traitment
        })

        socket.on('leaveDebate', data =>{
            var { userId, debateId } = data;
            //traitment
        })

    });
}