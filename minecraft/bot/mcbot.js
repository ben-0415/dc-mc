const { MinecraftBot, Minecraft_Channel_Id } = require('../../config.json')
const bot = require("./login");

var logger = require("./logger")
function mcbot(client) {
  try {
    function connect() {
      bot.on('spawn', async () => {
        logger.l(`======================================\r\nbot is ready\r\nbot-name:${bot.username}\r\n======================================`)
      })

      bot.on('message', async function (jsonMsg) {
        const health = new RegExp(/目標生命 \: ❤❤❤❤❤❤❤❤❤❤ \/ ([\S]+)/g); //清除目標生命
        if (health.test(jsonMsg.toString())) {
          return;
        } else {
          
          console.log(`${jsonMsg.toAnsi()}`);
        }

        if (MinecraftBot == "on") {
          const channel = client.channels.cache.get(Minecraft_Channel_Id);
          channel.send(`${jsonMsg.toString()}`);
        }
      })

      bot.once('end', () => {
        connect();
      })
    }
    connect();
  } catch (e) {
    logger.writeErrorLog(e);
    logger.e(e);

  }
}
module.exports = mcbot;




