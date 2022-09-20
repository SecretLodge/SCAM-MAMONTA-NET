import { NextFunction } from 'grammy'
import { findAndUpdateChannel } from '@/models/Channel'
import Context from '@/models/Context'

export default async function attachChannel(ctx: Context, next: NextFunction) {
  if (ctx.chat?.type === 'channel' && ctx.dbuser) {
    ctx.dbchannel = await findAndUpdateChannel({
      id: ctx.chat.id,
      username: ctx.chat.username ?? ctx.chat.title,
      admin_id: Number(ctx.dbuser.id),
    })
  }
  return next()
}
