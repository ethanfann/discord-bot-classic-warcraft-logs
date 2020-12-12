import Axios from 'axios'
import {
  GuildSettingsType,
  RankingType,
  ZoneType,
  PlayerEncounterDPSResponseType,
} from '../types/types'
require('dotenv').config()

const wcl = Axios.create({
  baseURL: 'https://classic.warcraftlogs.com/v1',
  params: {
    api_key: process.env.WCL_KEY,
  },
})

export function Rankings(
  guild: GuildSettingsType,
  name: string,
  zoneId?: number
): Promise<any> {
  if (zoneId) {
    return wcl.get<Array<RankingType>>(
      `/rankings/character/${name}/${guild.server}/${guild.region}?zone=${zoneId}`
    )
  } else {
    return wcl.get<Array<RankingType>>(
      `/rankings/character/${name}/${guild.server}/${guild.region}`
    )
  }
}

export function Zones(): Promise<any> {
  return wcl.get<Array<ZoneType>>('/zones')
}

// TODO: Create EncounterType
export function PlayerEncounterDPS(
  guild: GuildSettingsType,
  encounterId: number,
  classId: number
): Promise<any> {
  return wcl.get<PlayerEncounterDPSResponseType>(
    `/rankings/encounter/${encounterId}?metric=dps&class=${classId}&server=${guild.server}&region=${guild.region}`
  )
}
