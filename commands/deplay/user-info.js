const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('查看使用者資料or機器人')
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('要查詢的使用者')),
	async execute(interaction,client) {
        const target = interaction.options.getUser('user') ?? interaction.user
        const userinfo = new EmbedBuilder() 
        .setTitle(`使用者資料`) //設定標題
        .setColor("#5865F2") //設定顏色
        .setDescription(          
            `使用者名稱：${target}\n`+
            `使用者ＩＤ：${target.id}\n`+
            `使用者創建時間：<t:${~~(target.createdTimestamp/1000)}:R>\n`+
            `是否為機器人：${target.bot ? ':white_check_mark:':':negative_squared_cross_mark:'}\n`
            )
        .setTimestamp()
        .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL()});
                
        interaction.reply({ embeds: [userinfo] });
        

	},
};