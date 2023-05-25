const { EmbedBuilder } = require("discord.js");
const ec = require('../../settings/embed');
const moment = require("moment");

module.exports = {
    name: "longest-users",
    description: "Displays how many days/months/years a user been in the server.",
    options: [
        {
            name: 'user',
            description: 'Select a user to get information',
            type: 6,
            required: true,
        },
    ],
    
    run: async(client, interaction, args) => {
    const User = interaction.options.getUser("user")
    
    const TargetedUser = await interaction.guild.members.fetch(
        User.id || interaction.member.id
      );
      await TargetedUser.user.fetch();

      function joinedSuff(number) {
        if (number % 100 >= 11 && number % 100 <= 13) return number + "th";
  
        switch (number % 10) {
          case 1:
            return number + "st";
          case 2:
            return number + "nd";
          case 3:
            return number + "th";
        }
        return number + "th";
      }

      const fetchMembers = await interaction.guild.members.fetch();
      const JoinPos =
        Array.from(
          fetchMembers
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
            .keys()
        ).indexOf(TargetedUser.id) + 1;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${TargetedUser.user.username}`,
          iconURL:
            "https://cdn.discordapp.com/attachments/1064929361213530122/1066648072211410964/6879-member.png",
        })
        .setThumbnail(TargetedUser.user.avatarURL({ dynamic: true, size: 1024 }))
        .setColor(ec.color)
        .setDescription(`> ${interaction.guild.name} longest members since day 1...`)
        .addFields(
            { name: '**Member Joined At:**', value: `\`\`\`${joinedSuff(JoinPos)}\`\`\``, inline: true },
            { name: '**From Server:**', value: `\`\`\`${interaction.guild.name}\`\`\``, inline: true },
            { name: 'Joined Server On:', value: `\`\`\`${moment(TargetedUser.joinedAt).format('dddd Do MMM YYYY')}\`\`\``, inline: true },
            { name: "Created Account At:", value: `\`\`\`${moment(TargetedUser.user.createdAt).format('dddd Do MMM YYYY')}\`\`\``, inline: true }
            )
  
      await interaction.followUp({ embeds: [embed] });
    },
  };