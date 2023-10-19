const {ActionRowBuilder, ButtonBuilder, ButtonStyle,SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('text')
		.setDescription('測試'),
	async execute(interaction) {

	await interaction.reply("test");

	},
};