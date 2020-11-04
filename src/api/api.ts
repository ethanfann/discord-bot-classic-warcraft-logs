import Axios from 'axios'
import { GuildSettingsType, RankingType, ZoneType } from '../types/types'
require('dotenv').config()

const wcl = Axios.create({
  baseURL: 'https://classic.warcraftlogs.com/v1',
  params: {
    api_key: process.env.WCL_KEY,
  },
})

export function Rankings(guild: GuildSettingsType, name: string): Promise<any> {
  return wcl.get<Array<RankingType>>(
    `/rankings/character/${name}/${guild.server}/${guild.region}`
  )
}

export function Zones(): Promise<any> {
  return wcl.get<Array<ZoneType>>('/zones')
}
