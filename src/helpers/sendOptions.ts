import Context from '@/models/Context'

export default function sendOptions(ctx: Context, reply = false) {
  if (!reply) {
    return {
      parse_mode: 'HTML' as const,
    }
  }
  return {
    reply_to_message_id: ctx.msg?.message_id,
    parse_mode: 'HTML' as const,
  }
}
