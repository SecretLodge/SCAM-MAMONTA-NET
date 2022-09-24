import { countChannels } from '@/models/Channel'
import { countUsers } from '@/models/User'
import Context from '@/models/Context'
import env from '@/helpers/env'
import sendOptions from '@/helpers/sendOptions'

export default async function handleStatisticsAdmin(ctx: Context) {
  if (ctx.chat?.type === 'private' && ctx.chat.id === env.ADMIN_ID) {
    const allChannels = await countChannels()
    const allUsers = await countUsers()

    void ctx.sendWithStatisticsAdmin(
      'statistics',
      env.ADMIN_ID,
      allChannels.length,
      allUsers.length,
      {
        ...sendOptions(),
      }
    )
  }
}
