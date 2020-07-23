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
