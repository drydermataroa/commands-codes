const { MessageEmbed } = require("discord.js");
const ec = require('../../settings/embed')

module.exports = {
    name: "review",
    description: "⭐ | Give us a review",
    type: 'CHAT_INPUT',
    options: [
      {
        name: `stars`,
        description: `How much do you like us?`,
        type: "STRING",
        required: true,
        choices: [
          { name: "⭐", value: "⭐" },
          { name: "⭐⭐", value: "⭐⭐" },
          { name: "⭐⭐⭐", value: "⭐⭐⭐" },
          { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
          { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" },  
        ]
    },
    {
      name: 'review',
      description: `Give us a review`,
      type: "STRING",
      required: true,
    }
  ],
    run: async (client, interaction, args) => {
      let stars = interaction.options.getString('stars')
      let review = interaction.options.getString('review')

      if(stars == 1) stars = `⭐`
      if(stars == 2) stars = `⭐⭐`
      if(stars == 3) stars = `⭐⭐⭐`
      if(stars == 4) stars = `⭐⭐⭐⭐`
      if(stars == 5) stars = `⭐⭐⭐⭐⭐`
      
      const reviewEmbed = new MessageEmbed()
      .setAuthor({ name: `New review from ${interaction.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .addFields(
    { name: 'Review', value: `${review}` },
        { name: 'Stars', value: `${stars}` },
        )
      .setTitle("__**Server Reviews**__")
      .setColor(ec.color)
      .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
      .setTimestamp()

      const channel = client.channels.cache.find(c => c.name === 'review-channel') // Add your channel name here
      channel.send({ embeds: [reviewEmbed] }).then(m => m.react("⭐"))

      return interaction.followUp({ content: 'The review has been sent! thanks for making a review' })
    },
};