const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const bot_link = "https://discord.com/api/oauth2/authorize?client_id=1091379695037198387&permissions=8&scope=bot"


module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot-info')
		.setDescription('查看機器人資料'),
	async execute(interaction,client) {
        const botinfo = new EmbedBuilder()
        .setTitle(`機器人資料`) //設定標題
        .setColor("#5865F2") //設定顏色
        .setDescription(          
        `機器人名稱：${client.user.username}\n`+
        `機器人ＩＤ：${client.user.id}\n`+
        `機器人製作者：ben0415\n`+
        `機器人建立時間：<t:${~~(client.user.createdTimestamp/1000)}:R>\n`+
        `機器人邀請連結：${bot_link}\n`+
        `機器人所在伺服器數量：${client.guilds.cache.size}\n`+
        `機器人上線時間：${msToHMS(client.uptime)}`)
        .setTimestamp()
        .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL()});
                
        interaction.reply({ embeds: [botinfo] });
        

	},
};


function msToHMS(ms) {
    let seconds = ms / 1000; //將毫秒轉換為秒
    const hours = parseInt( seconds / 3600 ); //將可以轉為小時的秒轉換為小時
    seconds = seconds % 3600; //去除已轉換為小時的秒
    const minutes = parseInt( seconds / 60 ); //將可以轉為分鐘的秒轉換為分鐘
    seconds = seconds % 60; //去除已轉換為分鐘的秒
    return(`${hours}:${minutes}:${~~(seconds)}`); //回傳轉換後的結果，秒數進行四捨五入
  }