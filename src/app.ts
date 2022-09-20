import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { channelLanguageMenu, channelsMenu } from '@/menus/channels'
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import attachChannel from '@/middlewares/attachChannel'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import handleChannels from '@/handlers/channels'
import handleGithub from '@/handlers/github'
import handleLanguage from '@/handlers/language'
import handleWarning from '@/handlers/warning'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import sendIfSuccess from '@/middlewares/sendIfSuccess'
import startMongo from '@/helpers/startMongo'

async function runApp() {
  console.log('Starting app...')
  await startMongo()
  console.log('Mongo connected')
  bot
    .use(sequentialize())
    .use(ignoreOld())
    .use(attachUser)
    .use(i18n.middleware())
    .use(configureI18n)
    .use(attachChannel)
    .use(languageMenu)
    .use(channelLanguageMenu)
    .use(channelsMenu)
  bot.command(['start', 'language'], handleLanguage)
  bot.command('github', handleGithub)
  bot.command('set_language', handleChannels)
  bot.on('my_chat_member', sendIfSuccess)
  bot.on('msg', handleWarning)
  bot.catch(console.error)
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
