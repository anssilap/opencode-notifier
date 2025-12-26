import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { homedir } from "os"

export type EventType = "permission" | "complete" | "error"

export interface NotifierConfig {
  sound: boolean
  notification: boolean
  events: {
    permission: boolean
    complete: boolean
    error: boolean
  }
  messages: {
    permission: string
    complete: string
    error: string
  }
  sounds: {
    permission: string | null
    complete: string | null
    error: string | null
  }
}

const DEFAULT_CONFIG: NotifierConfig = {
  sound: true,
  notification: true,
  events: {
    permission: true,
    complete: true,
    error: true,
  },
  messages: {
    permission: "OpenCode needs permission",
    complete: "OpenCode has finished",
    error: "OpenCode encountered an error",
  },
  sounds: {
    permission: null,
    complete: null,
    error: null,
  },
}

function getConfigPath(): string {
  return join(homedir(), ".config", "opencode", "opencode-notifier.json")
}

export function loadConfig(): NotifierConfig {
  const configPath = getConfigPath()

  if (!existsSync(configPath)) {
    return DEFAULT_CONFIG
  }

  try {
    const fileContent = readFileSync(configPath, "utf-8")
    const userConfig = JSON.parse(fileContent)

    return {
      sound: userConfig.sound ?? DEFAULT_CONFIG.sound,
      notification: userConfig.notification ?? DEFAULT_CONFIG.notification,
      events: {
        permission: userConfig.events?.permission ?? DEFAULT_CONFIG.events.permission,
        complete: userConfig.events?.complete ?? DEFAULT_CONFIG.events.complete,
        error: userConfig.events?.error ?? DEFAULT_CONFIG.events.error,
      },
      messages: {
        permission: userConfig.messages?.permission ?? DEFAULT_CONFIG.messages.permission,
        complete: userConfig.messages?.complete ?? DEFAULT_CONFIG.messages.complete,
        error: userConfig.messages?.error ?? DEFAULT_CONFIG.messages.error,
      },
      sounds: {
        permission: userConfig.sounds?.permission ?? DEFAULT_CONFIG.sounds.permission,
        complete: userConfig.sounds?.complete ?? DEFAULT_CONFIG.sounds.complete,
        error: userConfig.sounds?.error ?? DEFAULT_CONFIG.sounds.error,
      },
    }
  } catch {
    return DEFAULT_CONFIG
  }
}

export function isEventEnabled(config: NotifierConfig, event: EventType): boolean {
  return config.events[event]
}

export function getMessage(config: NotifierConfig, event: EventType): string {
  return config.messages[event]
}

export function getSoundPath(config: NotifierConfig, event: EventType): string | null {
  return config.sounds[event]
}
