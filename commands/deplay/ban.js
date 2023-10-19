const { ActionRowBuilder, ButtonBuilder, ButtonStyle,SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('封鎖成員')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('要封鎖的使用者')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('封鎖原因(可選填)'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
    async execute(interaction){

        const target = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason') ?? '**_沒有提供理由_**';

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
			content: `確認封鎖 ${target} 原因:${reason}`,
			components: [row],
		});

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_00 });
            if (confirmation.customId === 'cance1') {
                await confirmation.update({ content: `封鎖者:${interaction.user} ,被封鎖者:${target}`, components: [] });
                await interaction.guild.members.ban(target);
            } else if (confirmation.customId === 'cance2') {
                await confirmation.update({ content: '已取消', components: [] });
            }
        } catch (e) {
			console.log(e.message);

            if(e.message == 'Collector received no interactions before ending with reason: time'){

                await interaction.editReply({ content: '超過時間,已取消', components: [] });

            }
            if(e.name=='DiscordAPIError[50013]'){
				await interaction.editReply({ content: '已取消', components: [] });
				await interaction.followUp({ content: `無法封鎖 請檢查機器人權限或${target}權限過高`,ephemeral: true });
			}
            await interaction.editReply('已取消');
            await interaction.followUp({ content : e.message ,ephemeral: true} )
        }
    }
};
