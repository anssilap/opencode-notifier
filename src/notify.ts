import notifier from "node-notifier"
import type { EventType } from "./config"

const NOTIFICATION_TITLE = "OpenCode"

export async function sendNotification(
  message: string,
  event: EventType
): Promise<void> {
  return new Promise((resolve) => {
    notifier.notify(
      {
        title: NOTIFICATION_TITLE,
        message: message,
        sound: false,
        timeout: 5,
        icon: undefined,
      },
      () => {
        resolve()
      }
    )
  })
}
