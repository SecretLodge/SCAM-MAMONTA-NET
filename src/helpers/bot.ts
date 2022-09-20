import { Bot } from 'grammy'
import { apiThrottler } from '@grammyjs/transformer-throttler'
import Context from '@/models/Context'
import env from '@/helpers/env'

const bot = new Bot<Context>(env.TOKEN, {
  ContextConstructor: Context,
})

bot.api.config.use(apiThrottler())

export default bot
