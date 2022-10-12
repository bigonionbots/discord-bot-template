const config = require('./config.json');
const { broadcastMsg, errorReport }  = require('./lib/utils.js');

const { REST } = require('@discordjs/rest');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// init the bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

//debug -- verbose in the logs
bot.on('debug', console.debug);

// log in the bot
bot.login(config.token).catch(error=>errorReport(error));

// if ever rate limited,
bot.on('rateLimit', (data) => errorReport('Ratelimit Error (' + bot.user.tag + '): ' + JSON.stringify(data)));

// load code for all slash commands
bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        bot.commands.set(command.data.name, command);
}

// announce life
bot.on('ready', () => {
        broadcastMsg('Bot online.');
});


// if slashcommand, execuse the code
bot.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = bot.commands.get(interaction.commandName);

        try {
                await command.execute(interaction);
        } catch (error) {
                errorReport(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
});
