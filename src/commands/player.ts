import Discord, { Message, Client } from 'discord.js'
import { RankingType, GuildSettingsType, IconType } from '../types/types'
import { Rankings } from '../api/api'

const icons = require('../info/icons.json')

function deriveMainSpec(rankings: Array<RankingType>): string {
  let counts = {}
  rankings.forEach(ranking => {
    counts[ranking.spec] = counts[ranking.spec] ? counts[ranking.spec] + 1 : 1
  })
  console.log(counts)
  let mainSpec: string = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  )
  return mainSpec
}

module.exports = {
  name: 'player',
  description:
    'Obtains top parses from the latest raid for the desired player.',
  execute: (guild: GuildSettingsType, msg: Message, args: Array<string>) => {
    let name: string = args[0]
    // WCL API has some questionable design decisions, like "Fire"
    // being used as a spec when every other
    // dps class just has "DPS"
    let specs: Array<string> = args[1] ? [args[1], 'Fire'] : ['DPS', 'Fire']

    if (name == null) {
      return
    }

    Rankings(guild, name)
      .then(response => {
        const icon: IconType = icons.find(
          (icon: IconType) => icon.className === response.data[0].class
        )
        let embed = new Discord.MessageEmbed()
          .setTitle(args[0])
          .setThumbnail(icon.url)

        let encounters = response.data.filter(encounter =>
          specs.includes(encounter.spec)
        )

        if (encounters.length === 0) {
          msg.reply(
            'No encounters found for the specified player. Are they raiding?'
          )
          return
        }

        encounters.forEach(encounter => {
          embed.addField(
            encounter.encounterName,
            encounter.percentile
              .toString()
              .split('.')
              .slice(0, 1),
            true
          )
        })

        let average: number = Math.round(
          encounters
            .filter(encounter => specs.includes(encounter.spec))
            .map(encounter => encounter.percentile)
            .reduce((sum: number, val: number) => sum + val, 0) /
            encounters.length
        )

        embed.addField('Average', average)

        if (average === 100) {
          embed.setColor('GOLD')
        } else if (average >= 95) {
          embed.setColor('ORANGE')
        } else if (average >= 75) {
          embed.setColor('DARK_PURPLE')
        } else if (average >= 50) {
          embed.setColor('NAVY')
        } else if (average >= 25) {
          embed.setColor('GREEN')
        } else {
          embed.setColor('GREY')
        }

        msg.reply(embed)
      })
      .catch(function(error) {
        console.log(error)
      })
  },
}
