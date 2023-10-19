const mineflayer = require('mineflayer')
const config = require("./config.json");
const logger = require("./logger.js")
function login(){
    const loginOpts = {  //登入資訊
        host: config.ip,  //伺服器ip
        port: config.port >= 0 ? config.port : undefined,  //伺服器port(預設25565)
        username: config.username,  //Minecraft帳號
        password: "",  //Minecraft密碼
        version: config.version,  //bot的Minecraft版本
        auth: config.auth === 'microsoft' ? 'microsoft' : 'offline', //登入驗證器使用offline或者microsoft
        defaultChatPatterns: false,
        checkTimeoutInterval:3600000
    }
    try
    {
        const bot = mineflayer.createBot(loginOpts)
        return  bot
    }
    catch(e)
    {
        logger.e(e);
        logger.writeErrorLog(e.toString());
    }

}
const bot = login();
module.exports=bot;

