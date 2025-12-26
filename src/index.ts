import type { Plugin } from "@opencode-ai/plugin"
import { loadConfig, isEventEnabled, getMessage, getSoundPath } from "./config"
import type { EventType, NotifierConfig } from "./config"
import { sendNotification } from "./notify"
import { playSound } from "./sound"

async function handleEvent(
  config: NotifierConfig,
  eventType: EventType
): Promise<void> {
  if (!isEventEnabled(config, eventType)) {
    return
  }

  const promises: Promise<void>[] = []

  if (config.notification) {
    const message = getMessage(config, eventType)
    promises.push(sendNotification(message, eventType))
  }

  if (config.sound) {
    const customSoundPath = getSoundPath(config, eventType)
    promises.push(playSound(eventType, customSoundPath))
  }

  await Promise.allSettled(promises)
}

export const NotifierPlugin: Plugin = async () => {
  const config = loadConfig()

  return {
    event: async ({ event }) => {
      if (event.type === "permission.updated") {
        await handleEvent(config, "permission")
      }

      if (event.type === "session.idle") {
        await handleEvent(config, "complete")
      }

      if (event.type === "session.error") {
        await handleEvent(config, "error")
      }
    },
  }
}

export default NotifierPlugin
