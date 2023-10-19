const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('解除封鎖使用者')
		.addUserOption(option =>
			option
                .setName('user')
                .setDescription('要解除封鎖的使用者')
                .setRequired(true))
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
            .setDMPermission(false),
    async execute(interaction){

        const user = interaction.options.getUser('target');

        try {
            await interaction.reply(`已解除封鎖${user}`);
            await interaction.guild.members.unban(user);
        }
         catch (e) {
			console.log(e);
            await interaction.editReply(`發生錯誤`);
            await interaction.followUp({ content : e.message ,ephemeral: true} )

        }
    }
};
