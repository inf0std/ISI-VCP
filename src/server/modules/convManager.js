class ConvManager {
    constructor() {
      this.convs = [];
    }
    addConv= (convId, type, mod, members,msgs) => {
        if (!this.findConv(convId))
          this.convs.push({
            id: convId,
            type: type, 
            mod: mod,
            members:members,
            msgs:msgs
          });
          else console.log(`conversation with ID ${convId} already exists`);
        }

   addMsg=(convId,msg)=>{
        let conv = this.findConv(convId);
        if(conv) conv.msgs.push(msg)
   }
   findRoom = (convId) => {
     return this.convs.find((conv) => conv.id == convId);
   };
}