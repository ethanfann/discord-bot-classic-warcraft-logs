import Discord from 'discord.js'
import { deleteGuildSettings, getGuildSettings } from './db/db'
require('dotenv').config()

// Discord
const bot = new Discord.Client()

// Command Handler
const commandHandler = {}
const botCommands = require('./commands')
Object.keys(botCommands).map(key => {
  commandHandler[botCommands[key].name] = botCommands[key]
})

// Events
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.username}!`)
})

bot.on('guildDelete', (guild: Discord.Guild) => {
  deleteGuildSettings(guild.id)
  console.log(`Removed guild: ${guild.name}`)
})

bot.on('message', msg => {
  if (!msg.guild || msg.author.bot) return

  if (!msg.content.startsWith('?wcl')) return

  const parts = msg.content.split(' ').map(part => part.trim())
  const commandName = parts[1]
  const commandArgs = parts.slice(2)
  console.log(commandArgs)

  const command = commandHandler[commandName]
  if (!command) {
    return
  }

  getGuildSettings(msg.guild.id).then(settings => {
    if (!settings && command.name != 'config') {
      msg.reply(
        'A server admin has yet to complete setup. Please run: ?wcl config'
      )
    }
    command.execute(settings, msg, commandArgs)
  })
})

process.env.ENV === 'dev'
  ? bot.login(process.env.TEST_TOKEN)
  : bot.login(process.env.TOKEN)
