const {ActionRowBuilder, ButtonBuilder, ButtonStyle,SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('踢出成員')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('你要踢出的人')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false),
	async execute(interaction) {

		const target = interaction.options.getUser('target');
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
			content: `確認要把${target}踢掉嗎?`,
			components: [row],
		});

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_00 });
            if (confirmation.customId === 'cance1') {
                await confirmation.update({ content: `踢出人:${interaction.user} ,被踢出者:${target}`, components: [] });
                await interaction.guild.members.kick(target);
            } else if (confirmation.customId === 'cance2') {
                await confirmation.update({ content: '已取消', components: [] });
            }
        } catch (e) {
            console.log(e.name);
			console.log(e);

			if(e.name=='DiscordAPIError[50013]'){
				await interaction.editReply({ content: '已取消', components: [] });
				await interaction.followUp({ content: `${target}權限過高`,ephemeral: true });
			}else if(e.name=='Error [InteractionCollectorError]')
            await interaction.editReply({ content: '超過時間,已取消', components: [] });
        }

	},
};