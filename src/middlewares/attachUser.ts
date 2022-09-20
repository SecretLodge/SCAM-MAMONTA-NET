import { NextFunction } from 'grammy'
import { findChannel } from '@/models/Channel'
import { findOrCreateUser } from '@/models/User'
import Context from '@/models/Context'

export default async function attachUser(ctx: Context, next: NextFunction) {
  if (ctx.chat?.type === 'private') {
    ctx.dbuser = await findOrCreateUser(ctx.chat.id)
  } else if (ctx.chat?.type === 'channel') {
    const channel = await findChannel(ctx.chat.id)

    if (channel) {
      ctx.dbuser = await findOrCreateUser(Number(channel.admin_id))
    } else {
      const user = await ctx.getChatMember(Number(ctx.from?.id))

      if (['creator', 'administrator'].includes(user.status)) {
        ctx.dbuser = await findOrCreateUser(Number(ctx.from?.id), user.status)
      }
    }
  }
  return next()
}
