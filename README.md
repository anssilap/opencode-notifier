# opencode-notifier

OpenCode plugin that plays sounds and sends system notifications when permission is needed, generation completes, or errors occur. Works on macOS, Linux, and Windows.

## Installation

Add the plugin to your `opencode.json` or `opencode.jsonc`:

```json
{
  "plugin": ["@mohak34/opencode-notifier@latest"]
}
```

Using `@latest` ensures you always get the newest version when the cache is refreshed.

To pin a specific version:

```json
{
  "plugin": ["@mohak34/opencode-notifier@0.1.8"]
}
```

Restart OpenCode. The plugin will be automatically installed and loaded.

## Updating

OpenCode caches plugins in `~/.cache/opencode`. Plugins are not auto-updated; you need to clear the cache to get new versions.

### If you use `@latest`

Clear the cache and restart OpenCode:

**Linux/macOS:**

```bash
rm -rf ~/.cache/opencode/node_modules/@mohak34/opencode-notifier
```

**Windows (PowerShell):**

```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.cache\opencode\node_modules\@mohak34\opencode-notifier"
```

Then restart OpenCode - it will download the latest version automatically.

### If you use a pinned version (e.g., `@0.1.7`)

1. Update the version in your `opencode.json`:

   ```json
   {
     "plugin": ["@mohak34/opencode-notifier@0.1.8"]
   }
   ```

2. Clear the cache (see commands above)

3. Restart OpenCode

### Check installed version

**Linux/macOS:**

```bash
cat ~/.cache/opencode/node_modules/@mohak34/opencode-notifier/package.json | grep version
```

**Windows (PowerShell):**

```powershell
Get-Content "$env:USERPROFILE\.cache\opencode\node_modules\@mohak34\opencode-notifier\package.json" | Select-String "version"
```

## Platform Notes

The plugin works out of the box on all platforms. For best results:

- **macOS**: No additional setup required
- **Windows**: No additional setup required
- **Linux**: For sounds, one of these should be installed: `paplay`, `aplay`, `mpv`, or `ffplay`. For notifications, `notify-send` is recommended.

## Configuration

To customize the plugin, create `~/.config/opencode/opencode-notifier.json`:

```json
{
  "sound": true,
  "notification": true,
  "timeout": 5,
  "events": {
    "permission": { "sound": true, "notification": true },
    "complete": { "sound": true, "notification": true },
    "error": { "sound": true, "notification": true }
  },
  "messages": {
    "permission": "OpenCode needs permission",
    "complete": "OpenCode has finished",
    "error": "OpenCode encountered an error"
  },
  "sounds": {
    "permission": "/path/to/custom/sound.wav",
    "complete": "/path/to/custom/sound.wav",
    "error": "/path/to/custom/sound.wav"
  }
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sound` | boolean | `true` | Global toggle for all sounds |
| `notification` | boolean | `true` | Global toggle for all notifications |
| `timeout` | number | `5` | Notification duration in seconds (Linux only) |

### Events

Control sound and notification separately for each event:

```json
{
  "events": {
    "permission": { "sound": true, "notification": true },
    "complete": { "sound": false, "notification": true },
    "error": { "sound": true, "notification": false }
  }
}
```

Or use a boolean to toggle both:

```json
{
  "events": {
    "permission": true,
    "complete": false,
    "error": true
  }
}
```

### Messages

Customize notification text:

```json
{
  "messages": {
    "permission": "Action required",
    "complete": "Done!",
    "error": "Something went wrong"
  }
}
```

### Custom Sounds

Use your own sound files:

```json
{
  "sounds": {
    "permission": "/home/user/sounds/alert.wav",
    "complete": "/home/user/sounds/done.wav",
    "error": "/home/user/sounds/error.wav"
  }
}
```

If a custom sound file path is provided but the file doesn't exist, the plugin will fall back to the bundled sound.

## License

MIT
