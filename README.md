# Discord Bot Template

Requires:
- node (tested with v17.8.0)
- discord.js (tested with 14.3.0)

Includes some functions in `lib/utils.js` to for

### Initial Steps
- On the [Discord Application Page](https://www.discord.com/developers/) create a new application, then initiate the bot.  
  - Under the General Information page, note the 19-digit application ID.
  - Under the Bot page, you will initially need to reset the token in order to copy the token.
- Edit the `config.json` file and replace clientId and token with the application ID and token.
- In a server of your choice, create a webhook to a channel under channel settings and Integrations. Copy the webhook look and include in `config.json` for alerts/notifications from the bot.

### Slash Commands
This code is set up similarly to the examples provided on the [discord.js Guide](https://discordjs.guide/) with each command residing in its own file in the `commands` directory. 

Commands must be registered in order to be used. The `deployCmds.js` file will register all commands in the `commands` directory. It can take a few minutes for commands to appear on Discord. If a command option or setting is changed, it should be deployed again for Discord to update.

In order to delete commands, the `delCmds.js` script will wipe all deployed commands. There are methods to delete specific commands without wiping and re-registering them all that are outlined in the [discord.js Guide](https://discordjs.guide/), along with example code to accomplish that.


### Considerations
Rather than keep the bot token in the `config.json` file, it might be more secure to have the bot token in an environment variable and use process.env to retrieve.
