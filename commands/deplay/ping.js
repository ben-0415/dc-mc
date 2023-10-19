const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('機器人延遲'),
	
    //========\\
    
        async execute(interaction,client) {
		const msg = await interaction.reply({
            content: "正在計算延遲......",
            fetchReply: true
          });
          
          const ping = msg.createdTimestamp - interaction.createdTimestamp;
          
          if(ping>300){
            var good = "我網路就爛";
          }
          else{
           var good = "good很棒";
          }

          //editReply是指修改回覆，使用此函數是因為我們先前已經發送過指令，若用reply會發生錯誤
            const pingEmbed = new EmbedBuilder()
            .setTitle(`Pong!`) //設定標題
            .setDescription(`Ping:${ping} ms\nAPI:${client.ws.ping} ms\n機器人網路品質:${good}`)//設定內文
            .setColor("#5865F2") //設定顏色
            .setTimestamp()
            .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL()});
            interaction.editReply({content:``, embeds: [pingEmbed] });
            console.log(`Ping:${ping} ms`);

	},
};