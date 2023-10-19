const { EmbedBuilder } = require('discord.js');
const  bot  = require("./minecraft/bot/login")
const { token, clientId, msgsave, MinecraftBot } = require('./config.json');
var fs = require('fs')


module.exports = {
  execute(message, client) {
    const texttime = new Date(message.createdTimestamp);
    console.log(texttime)
    console.log(message);
    if (msgsave != "off") {
      fs.appendFile('./text/text.txt', `伺服器:${message.guildId} 頻道:${message.channelId} 使用者:${message.author} 時間:${texttime}訊息:\n${message.content}\n`, function (error) {
        if (error == null)
          console.log("訊息儲存 no error");
        else
          console.log("訊息儲存 " + error);
      })
    } else
      console.log("訊息儲存已關閉");

    //minecraftbot指令
    if (MinecraftBot == "on") {
      let msg = message.toString();
      let match = msg.match(/&m (.+)/);
      if (match) {
        let extractedValue = match[1];
        bot.chat(extractedValue);
        console.log(`DC=>${message.author} : ${extractedValue}`); // 输出 
      }
    }

    if (message.content === `<@${clientId}>`) {
      const sleep = new EmbedBuilder()
        .setTitle(`你叫我嗎?`) //設定標題
        .setColor("#5865F2")
        .setDescription(`我要睡覺,請勿打擾zzz`); //設定顏色
      message.reply({ embeds: [sleep], });
    }
  }

};

