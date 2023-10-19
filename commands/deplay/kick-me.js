const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick-me')
		.setDescription('將自己踢出(可以再次確認)'),
	async execute(interaction,client) {
        const target = interaction.user;
        const cance2 = new ButtonBuilder()
        .setCustomId('cance1')
        .setLabel('確認')
        .setStyle(ButtonStyle.Success);
        const cance3 = new ButtonBuilder()
        .setCustomId('cance2')
        .setLabel('取消')
        .setStyle(ButtonStyle.Danger);        
		const row = new ActionRowBuilder()
			.addComponents( cance2, cance3);

        const response = await interaction.reply({
			content: `${target}要把自己踢掉嗎?`,
			components: [row],
		});

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 0 });
            if (confirmation.customId === 'cance1') {
                await confirmation.update({ content: '走的開心', components: [] });
                await interaction.guild.members.kick(target);
            } else if (confirmation.customId === 'cance2') {
                await confirmation.update({ content: '明智之舉', components: [] });
            }
        } catch (e) {
            console.log(e);
            await interaction.editReply({ content: '怎麼不回我阿', components: [] });
        }
	},
};