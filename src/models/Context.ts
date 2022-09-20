import { Context as BaseContext } from 'grammy'
import { ChannelScamBot } from '@/models/Channel'
import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n/dist/source'
import { UserWarningBot } from '@/models/User'

class Context extends BaseContext {
  readonly i18n!: I18nContext
  dbuser!: DocumentType<UserWarningBot>
  dbchannel!: DocumentType<ChannelScamBot>

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
}

export default Context
