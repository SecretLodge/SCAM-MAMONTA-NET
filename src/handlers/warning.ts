import { findAndUpdateChannel } from '@/models/Channel'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'
import sendOptionsNotificatoin from '@/helpers/sendOptionsNotificatoin'

export default async function handleWarning(ctx: Context) {
  if (ctx.chat?.type === 'channel') {
    try {
      await ctx.api.deleteMessage(
        Number(ctx.dbchannel.id),
        ctx.dbchannel.message_id
      )
    } catch {
      console.log('Message for delete not found')
    }
    ctx.i18n.locale(ctx.dbchannel.language)
    try {
      await ctx
        .sendWithLocalization(
          'warning',
          Number(ctx.dbchannel.id),
          ctx.dbchannel.username,
          { ...sendOptionsNotificatoin() }
        )
        .then(async (message) => {
          ctx.dbchannel = await findAndUpdateChannel({
            id: ctx.dbchannel.id,
            message_id: message.message_id,
          })
        })
    } catch {
      ctx.i18n.locale(ctx.dbuser.language)
      await ctx.sendWithLocalization(
        'not_permissions',
        Number(ctx.dbuser.id),
        ctx.dbchannel.username,
        { ...sendOptions() }
      )
    }
  }
}
