import { ChannelScamBot, allChannels } from '@/models/Channel'
import { DocumentType } from '@typegoose/typegoose'
import { Menu, MenuRange } from '@grammyjs/menu'
import { cwd } from 'process'
import { load } from 'js-yaml'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import Context from '@/models/Context'

interface YamlWithName {
  name: string
}

let channelT: DocumentType<ChannelScamBot>

const localeFilePaths = readdirSync(resolve(cwd(), 'locales'))

const localeFile = (path: string) => {
  return load(
    readFileSync(resolve(cwd(), 'locales', path), 'utf8')
  ) as YamlWithName
}

const setLanguageChannel = (languageCode: string) => async (ctx: Context) => {
  ctx.dbchannel = channelT
  ctx.dbchannel.language = languageCode
  await ctx.dbchannel.save()
  return ctx.editMessageText(
    `${ctx.i18n.t('language_channel_success')} @${ctx.dbchannel.username} (${
      ctx.dbchannel.language
    })`,
    {
      parse_mode: 'HTML',
      reply_markup: undefined,
    }
  )
}

export const channelLanguageMenu = new Menu<Context>('channel_menu')

localeFilePaths.forEach((localeFilePath, index) => {
  const localeCode = localeFilePath.split('.')[0]
  const localeName = localeFile(localeFilePath).name
  channelLanguageMenu.text(localeName, setLanguageChannel(localeCode))
  if (index % 2 != 0) {
    channelLanguageMenu.row()
  }
})

const setChannel =
  (channel: DocumentType<ChannelScamBot>) => (ctx: Context) => {
    channelT = channel
    ctx.i18n.locale(ctx.dbuser.language)
    return ctx.editMessageText(
      `${ctx.i18n.t('language_select_channel')} @${channel.username}`,
      {
        parse_mode: 'HTML',
        reply_markup: channelLanguageMenu,
      }
    )
  }

export const channelsMenu = new Menu<Context>('channels')

channelsMenu.dynamic(async (ctx) => {
  const range = new MenuRange<Context>()
  const channels = await allChannels(Number(ctx.chat?.id))

  channels.forEach((channel: DocumentType<ChannelScamBot>) => {
    range
      .text(`${channel.username} (${channel.language})`, setChannel(channel))
      .row()
  })

  return range
})
