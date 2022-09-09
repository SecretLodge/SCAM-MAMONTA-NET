import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import handleChanelPost from '@/handlers/tutorial'
import handleLanguage from '@/handlers/language'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
//import sendHelp from '@/handlers/help'
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
    .use(languageMenu)
  bot.command('start', handleLanguage)
  bot.command('rules', handleChanelPost)
  bot.catch(console.error)
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
