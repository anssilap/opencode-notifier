# opencode-notifier

OpenCode plugin that sends system notifications and plays sounds when:
- Permission is needed
- Generation completes
- Errors occur

Works on macOS, Linux, and Windows.

## Installation

Add the plugin to your OpenCode config:

```json
// ~/.config/opencode/opencode.json or .opencode/opencode.json
{
  "plugin": ["opencode-notifier"]
}
```

Restart OpenCode. The plugin will be automatically downloaded and activated.

## Configuration (Optional)

Create `~/.config/opencode/opencode-notifier.json` to customize behavior:

```json
{
  "sound": true,
  "notification": true,
  "events": {
    "permission": true,
    "complete": true,
    "error": true
  },
  "messages": {
    "permission": "OpenCode needs permission",
    "complete": "OpenCode has finished",
    "error": "OpenCode encountered an error"
  },
  "sounds": {
    "permission": "/path/to/custom/permission.wav",
    "complete": "/path/to/custom/complete.wav",
    "error": "/path/to/custom/error.wav"
  }
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sound` | boolean | `true` | Enable/disable all sounds |
| `notification` | boolean | `true` | Enable/disable all notifications |
| `events.permission` | boolean | `true` | Enable/disable permission alerts |
| `events.complete` | boolean | `true` | Enable/disable completion alerts |
| `events.error` | boolean | `true` | Enable/disable error alerts |
| `messages.permission` | string | "OpenCode needs permission" | Custom permission message |
| `messages.complete` | string | "OpenCode has finished" | Custom completion message |
| `messages.error` | string | "OpenCode encountered an error" | Custom error message |
| `sounds.permission` | string | (bundled) | Custom sound file path |
| `sounds.complete` | string | (bundled) | Custom sound file path |
| `sounds.error` | string | (bundled) | Custom sound file path |

### Examples

**Notifications only (no sound):**
```json
{
  "sound": false,
  "notification": true
}
```

**Sound only (no notifications):**
```json
{
  "sound": true,
  "notification": false
}
```

**Only permission alerts:**
```json
{
  "events": {
    "permission": true,
    "complete": false,
    "error": false
  }
}
```

## Platform Requirements

### macOS
- Notifications: Works out of the box (Notification Center)
- Sound: Works out of the box (`afplay`)

### Linux
- Notifications: Requires `libnotify` (`notify-send` command)
  - Pre-installed on Ubuntu, Fedora, and most desktop distros
  - Install: `sudo apt install libnotify-bin` (Debian/Ubuntu)
- Sound: Requires one of:
  - `paplay` (PulseAudio) - most common
  - `aplay` (ALSA)
  - `mpv`
  - `ffplay` (FFmpeg)

### Windows
- Notifications: Works out of the box (Toast notifications, Windows 8+)
- Sound: Works out of the box (PowerShell)

## Custom Sounds

To use custom sounds, add WAV files and reference them in your config:

```json
{
  "sounds": {
    "permission": "/home/user/sounds/alert.wav",
    "complete": "/home/user/sounds/done.wav",
    "error": "/home/user/sounds/error.wav"
  }
}
```

## License

MIT
