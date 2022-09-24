import { Context as BaseContext } from 'grammy'
import { ChannelScamBot } from '@/models/Channel'
import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n/dist/source'
import { UserWarningBot } from '@/models/User'

class Context extends BaseContext {
  readonly i18n!: I18nContext
  dbuser!: DocumentType<UserWarningBot>
  dbchannel!: DocumentType<ChannelScamBot>

  stringChannels!: string

  replyWithLocalization: this['reply'] = (text, other, ...rest) => {
    text = this.i18n.t(text)
    return this.reply(text, other, ...rest)
  }

  sendWithLocalization = (
    text: string,
    id: number,
    username: string,
    sendOptions: object
  ) => {
    text = this.i18n.t(text, { username: username })
    return this.api.sendMessage(id, text, sendOptions)
  }

  sendWithStatistics = (
    text: string,
    id: number,
    username: string,
    channels: number,
    subscribers: number,
    sendOptions: object
  ) => {
    text = this.i18n.t(text, {
      username: username,
      channels: channels,
      count: subscribers,
    })
    return this.api.sendMessage(id, text, sendOptions)
  }

  sendWithStatisticsAdmin = (
    text: string,
    id: number,
    countChannels: number,
    countUsers: number,
    sendOptions: object
  ) => {
    text = this.i18n.t(text, {
      countChannels: countChannels,
      countUsers: countUsers,
    })
    return this.api.sendMessage(id, text, sendOptions)
  }

  sendWithStatisticsChannels = (
    text: string,
    id: number,
    channels: ChannelScamBot[],
    sendOptions: object
  ) => {
    for (const channel of channels) {
      this.stringChannels += `@${channel.username}: <b>${channel.subscribers}</b> <b>SUBS</b> <b>(${channel.language})</b> \n`
    }
    text = this.i18n.t(text, {
      namesChannels: this.stringChannels.slice(9),
    })
    return this.api.sendMessage(id, text, sendOptions)
  }
}

export default Context
