import { Guild, Message, User, DMChannel, TextChannel } from 'discord.js'
import { saveGuildSettings } from '../db/db'

module.exports = {
  name: 'config',
  description: 'Configures the WoW Classic Server and Region preference.',
  execute: (guild: Guild, msg: Message, args: Array<string>) => {
    const filter = message => message.author.id === msg.author.id

    // Verify author permissions
    // if (
    //   msg.channel.type === 'text' &&
    //   !msg.member.hasPermission('ADMINISTRATOR')
    // ) {
    //   return
    // }

    msg.author
      .send("Enter your server's name (Faerlina, Skaram, ...):")
      .then(() => {
        msg.author.dmChannel
          .awaitMessages(filter, {
            max: 1,
            time: 300000,
          })
          .then(server => {
            if (server.first().content != null) {
              msg.author
                .send("Enter your server's region (US, EU, KR, TW, CN):")
                .then(() => {
                  msg.author.dmChannel
                    .awaitMessages(filter, {
                      max: 1,
                      time: 300000,
                    })
                    .then(region => {
                      saveGuildSettings(
                        msg.guild.id,
                        server.first().content,
                        region.first().content
                      )
                      msg.author.send('Setup completed!')
                    })
                })
            }
          })
      })
  },
}
