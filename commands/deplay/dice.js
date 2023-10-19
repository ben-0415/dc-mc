const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('丟骰子'),
	async execute(interaction) {
        const result = Math.floor(Math.random() * 6) + 1;
        const diceEmbed = new EmbedBuilder()
        .setTitle(`🎲 你得到了 ${result}`) //設定標題
        .setColor("#5865F2") ;//設定顏色
        await interaction.reply({
        embeds: [diceEmbed],
      });
        

	},
};