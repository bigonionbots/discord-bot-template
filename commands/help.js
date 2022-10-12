const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { botColor } = require('../config.json');


const help_message = new EmbedBuilder()
        .setColor(botColor)
        .setTitle('Bot Help Screen')
        .setDescription('\n\
**/help** - This message!\n\
**/command1 [args]** - Some command\n\
**/command2 [args]** - Some other command');

// see https://discordjs.guide/creating-your-bot/creating-commands.html for info on slashcommands and options


module.exports = {
        data: new SlashCommandBuilder()
                .setName('help')
                .setDescription('Show help for RevoFi Bot')
                .setDMPermission(false), 
        async execute(interaction) {
		// ephemeral flag for only user can see, reduces spam
                await interaction.reply({ embeds: [help_message], ephemeral: true }); 
        },
};
