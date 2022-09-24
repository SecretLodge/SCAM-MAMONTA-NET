import { countChannels } from '@/models/Channel'
import Context from '@/models/Context'
import env from '@/helpers/env'
import sendOptions from '@/helpers/sendOptions'

export default async function handleStatChannel(ctx: Context) {
  if (ctx.chat?.type === 'private' && ctx.chat.id === env.ADMIN_ID) {
    const allChannels = await countChannels()

    void ctx.sendWithStatisticsChannels('channels', env.ADMIN_ID, allChannels, {
      ...sendOptions(),
    })
  }
}
