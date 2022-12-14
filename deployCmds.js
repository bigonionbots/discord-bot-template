const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const config = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token);

rest.put(Routes.applicationCommands(config.clientId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);


