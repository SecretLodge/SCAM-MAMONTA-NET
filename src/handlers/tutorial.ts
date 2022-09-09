import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default function handleChanelPost(ctx: Context) {
  return ctx.replyWithLocalization('tutorial', sendOptions(ctx))
}
