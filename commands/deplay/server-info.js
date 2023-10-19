const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('server-info')
		.setDescription('查看伺服器資料'),
	async execute(interaction,client) {
        const botinfo = new EmbedBuilder()
        .setTitle(`伺服器資料`) //設定標題
        .setColor("#5865F2") //設定顏色
        .setDescription(          
            `伺服器名稱：${interaction.guild.name}\n` +
            `伺服器ＩＤ：${interaction.guild.id}\n` +
            `伺服器創建時間：<t:${~~(interaction.guild.createdTimestamp/1000)}:R>\n` +
            `伺服器簡介：${interaction.guild.description ?? "無"}\n` + 
            `伺服器擁有者：<@${interaction.guild.ownerId}>\n` +
            `伺服器人數：${interaction.guild.memberCount}\n`
            )
        .setTimestamp()
        .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL()});
                
        interaction.reply({ embeds: [botinfo] });
        

	},
};