import { countChannels, findAndUpdateChannel } from '@/models/Channel'
import Context from '@/models/Context'
import env from '@/helpers/env'
import sendOptions from '@/helpers/sendOptions'
import sendOptionsNotificatoin from '@/helpers/sendOptionsNotificatoin'

export default async function sendIfSuccess(ctx: Context) {
  if (
    ctx.chat?.type === 'channel' &&
    ctx.myChatMember?.new_chat_member.status === 'administrator'
  ) {
    try {
      if (ctx.dbchannel.message_id)
        await ctx.api.deleteMessage(
          Number(ctx.dbchannel.id),
          ctx.dbchannel.message_id
        )
    } catch {
      console.log('Message for delete not found')
    }
    try {
      ctx.i18n.locale(ctx.dbchannel.language)
      const count = await ctx.getChatMemberCount()
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
            subscribers: count,
          })
        })
      ctx.i18n.locale(ctx.dbuser.language)
      await ctx.sendWithLocalization(
        'success',
        Number(ctx.dbuser.id),
        ctx.dbchannel.username,
        { ...sendOptions() }
      )
      const channels = await countChannels()
      await ctx.sendWithStatistics(
        'msg_bot_added',
        env.ADMIN_ID,
        ctx.dbchannel.username,
        channels.length,
        count,
        { ...sendOptions() }
      )
    } catch (error) {
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
