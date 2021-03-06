import { GuildSettingsType } from '../types/types'
import Keyv from 'keyv'
require('dotenv').config()

const keyv = new Keyv(process.env.DB_URI)
keyv.on('error', error => console.log('Connection Error', error))

export async function saveGuildSettings(
  id: string,
  server: string,
  region: string
) {
  await keyv.set(id, { server: server, region: region })
}

export async function getGuildSettings(id: string): Promise<GuildSettingsType> {
  return await keyv.get(id)
}

export async function deleteGuildSettings(id: string) {
  await keyv.delete(id)
}
