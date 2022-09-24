export default function sendOptionsNotificatoin() {
  return {
    disable_notification: true,
    parse_mode: 'HTML' as const,
  }
}
