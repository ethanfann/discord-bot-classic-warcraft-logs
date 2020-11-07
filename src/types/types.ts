export interface GuildSettingsType {
  server: string
  region: string
}

export interface EncounterType {
  id: number
  name: string
  npcID: number
}

export interface RankingType {
  encounterID: number
  encounterName: string
  class: string
  spec: string
  rank: number
  outOf: number
  duration: number
  startTime: number
  reportID: string
  fightID: string
  difficulty: number
  characterID: number
  characterName: string
  server: string
  percentile: number
  ilvlKeyOrPatch: number
  talents: Array<any>
  gear: Array<any>
  total: number
  estimated: boolean
}

export interface ZoneType {
  id: number
  name: string
  frozen: boolean
  encounters: Array<EncounterType>
}

export interface GuildSpeedRankingReponseType {
  page: number
  hasMorePages: boolean
  count: number
  rankings: Array<GuildSpeedRankingType>
}

export interface GuildSpeedRankingType {
  serverID: number
  serverName: string
  regionName: string
  duration: number
  startTime: number
  reportStart: number
  damageTaken: number
  deaths: number
  fightID: number
  reportID: string
  exploit: number
  tanks: number
  healers: number
  melee: number
  ranged: number
  guildFaction: number
  guildName: string
  guildID: number
  bracket: number
  size: number
}

export interface PlayerEncounterDPSResponseType {
  page: number
  hasMorePages: boolean
  count: number
  rankings: Array<PlayerEncounterDPSType>
}

export interface PlayerEncounterDPSType {
  name: string
  class: number
  spec: number
  total: number
  duration: number
  startTime: number
  fightID: number
  guildName: string
  serverName: string
  regionName: string
  hidden: boolean
  itemLevel: number
  size: number
}

export interface ClassType {
  id: number
  name: string
  specs: Array<SpecType>
}

export interface SpecType {
  id: number
  name: string
}

export interface IconType {
  classId: number
  className: string
  url: string
}
