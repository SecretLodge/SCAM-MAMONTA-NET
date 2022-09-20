export default function sendOptionsNotify() {
  return {
    disable_notification: true,
    parse_mode: 'HTML' as const,
  }
}
