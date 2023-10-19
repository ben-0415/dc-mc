var fs = require('fs')
const sd = require('silly-datetime'); //讀取silly-datetime模塊
module.exports={  
    writeErrorLog(e){
      this.i("進入writeErrorLog，撰寫ErrorLog");
      const time = sd.format(new Date(), 'YYYY-MM-DD-HH-mm-ss');
      if (!fs.existsSync(`./logs/${time}.txt`)){
        fs.writeFileSync(`./logs/${time}.txt`, e.toString());
      } 
    },

    e(msg){
      console.error(msg);
    },
  
    d(msg){
      console.debug(msg)
    },
  
    i(msg){
      console.info(msg)
    },
  
    l(msg){
      console.log(msg);
    }


}