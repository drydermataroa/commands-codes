const { Client, Message } = require('discord.js')

module.exports = {
  name: 'badges',
  category: 'info',
  description: "Badge Info",
  emoji: '🛡️',
  /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    
    const flags = user.flags.toArray();
    
    message.channel.send(`${user}'s badges: ${flags.join(', ')}`)
  }
}
