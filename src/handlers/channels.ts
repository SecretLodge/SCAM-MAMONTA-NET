import { channelsMenu } from '@/menus/channels'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default function handleChannels(ctx: Context) {
  if (ctx.chat?.type === 'private') {
    void ctx.replyWithLocalization('select_channel', {
      ...sendOptions(),
      reply_markup: channelsMenu,
    })
  }
}
