import Context from '@/models/Context'
import languageMenu from '@/menus/language'
import sendOptions from '@/helpers/sendOptions'

export default function handleLanguage(ctx: Context) {
  if (ctx.chat?.type === 'private')
    return ctx.replyWithLocalization('language', {
      ...sendOptions(),
      reply_markup: languageMenu,
    })
}
