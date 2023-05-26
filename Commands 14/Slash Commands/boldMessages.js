const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'content',
    description: 'send message',
    options: [
        {
            name: 'title',
            description: 'create a message/title',
            type: 3,
            required: true,
        },
        {
            name: 'input1',
            description: 'create a message',
            type: 3,
            required: false,
        },
        {
            name: 'input2',
            description: 'create a message',
            type: 3,
            required: false,
        },
        {
            name: 'input3',
            description: 'create a message',
            type: 3,
            required: false,
        },
        {
            name: 'input4',
            description: 'create a message',
            type: 3,
            required: false,
        },
    ],

    run: async(client, interaction, args) => {
        const content = interaction.options.getString('title')
        const num1 = interaction.options.getString('input1')
        const num2 = interaction.options.getString('input2')
        const num3 = interaction.options.getString('input3')
        const num4 = interaction.options.getString('input4')

        interaction.followUp(
            `> # ${content}\n`+
            `> \n`+
            `> - ${num1}\n`+
            `> - ${num2}\n`+
            `> - ${num3}\n`+
            `> - ${num4}\n`
            )
    }
}