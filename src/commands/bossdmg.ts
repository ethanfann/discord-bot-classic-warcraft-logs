import Discord, { Message } from 'discord.js'
import {
  GuildSettingsType,
  ZoneType,
  EncounterType,
  PlayerEncounterDPSType,
  ClassType,
  IconType,
} from '../types/types'
import { PlayerEncounterDPS } from '../api/api'
import axios from 'axios'

// TODO: Find a way to not hard code determine this
const RECENT_ZONE_ID: number = 1005

interface LeaderboardMapType {
  [playerName: string]: number
}

module.exports = {
  name: 'bossdmg',
  description:
    'Displays the Top-10 characters of a specific spec with the highest average boss damage.',
  execute: (guild: GuildSettingsType, msg: Message, args: Array<string>) => {
    const zones = require('../info/zones')
    const classes = require('../info/classes')
    const icons = require('../info/icons')

    const specName: string = args[0]
    const spec = classes.find(
      (wowClass: ClassType) => wowClass.name === specName
    )

    let requests: Array<Promise<any>> = []
    const recentZone: ZoneType = zones.find(
      (zone: ZoneType) => zone.id === RECENT_ZONE_ID
    )
    recentZone.encounters.forEach((encounter: EncounterType) => {
      requests.push(PlayerEncounterDPS(guild, encounter.id, spec.id))
    })

    let leaderboard: LeaderboardMapType = {}
    axios.all(requests).then(
      axios.spread((...responses) => {
        responses.forEach(response => {
          response.data['rankings'].forEach(
            (ranking: PlayerEncounterDPSType) => {
              leaderboard[ranking.name]
                ? (leaderboard[ranking.name] += ranking.total)
                : (leaderboard[ranking.name] = ranking.total)
            }
          )
        })

        const icon = icons.find((icon: IconType) => icon.classId === spec.id)
        const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1])
        let embed = new Discord.MessageEmbed()
          .setTitle('Top Average Boss Damage')
          .setThumbnail(icon.url)

        embed.addField('Class', spec.name, true)
        embed.addField('Raid', 'AQ40', true)

        sorted.slice(0, 5).forEach((player, index) => {
          embed.addField(
            `${index + 1}. ${player[0]}`,
            `${(player[1] / recentZone.encounters.length).toFixed(2)} dps`
          )
        })

        msg.reply(embed)
      })
    )
  },
}
