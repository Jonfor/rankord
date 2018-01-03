const Discord = require('discord.js');
const client = new Discord.Client();
let totalInvites = 0;
const ranks = ["test", "adminTest"];

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  const prefix = "!";
  if (message.author.bot || !message.content.startsWith(prefix)) {
    return;
  }

  if (message.content === '!ranking') {
    // We need to retrieve the invites from the guild/server the message was sent from.
    // We do this by getting the guild/server id from the channel the message was sent from.
    const currGuild = message.author.client.guilds.get(message.channel.guild.id);

    currGuild.fetchInvites().then((invites) => {
      // console.log(invites);
      for (let invite of invites) {
        // uses is not a field that is always going to exist so check first!
        if (invite[1].uses) {
          totalInvites = totalInvites + invite[1].uses;
        }
      }
      console.log("Number of uses: " + totalInvites);

      return Promise.resolve(totalInvites);
    }).then((totalInvites) => {
      const roles = message.member.roles;

      for (let role of roles.values()) {
        if (ranks.includes(role.name)) {
          console.log(role.name);
        }
      }
    })
      .catch((error) => {
      // Make sure to add the "Manage Server" permission to the bot via a Role. Otherwise this will error out!
      message.reply(error.message);
    });
  }
});

client.login('');
