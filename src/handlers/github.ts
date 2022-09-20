import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default function handleGithub(ctx: Context) {
  if (ctx.chat?.type === 'private') {
    ctx.i18n.locale(ctx.dbuser.language)
    return ctx.replyWithLocalization('github', { ...sendOptions() })
  }
}
