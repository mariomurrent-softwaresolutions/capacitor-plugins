# Edge To Edge Test App - Ionic React

This is an Ionic React test application for testing the Android Edge To Edge Support plugin, specifically the status bar and navigation bar color functionality added in PR #1.

## Features

This test app demonstrates:
- Enabling/disabling edge-to-edge mode
- Getting window insets
- Setting status bar color independently
- Setting navigation bar color independently
- Setting both bars to the same color (legacy method)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the web assets:
```bash
npm run build
```

3. Sync Capacitor:
```bash
npx cap sync
```

4. Open in Android Studio:
```bash
npx cap open android
```

## Running the App

1. Build the React app:
```bash
npm run build
```

2. Copy web assets to native platform:
```bash
npx cap copy
```

3. Run on Android device or emulator from Android Studio

## Testing

The app provides controls to:
- **Enable/Disable**: Toggle edge-to-edge mode
- **Get Insets**: Display the current window insets
- **Set Status Bar Color**: Change the status bar color independently
- **Set Navigation Bar Color**: Change the navigation bar color independently
- **Set Background Color**: Set both bars to the same color (deprecated method)

### Test Scenarios

1. Test independent colors:
   - Set status bar to white (#ffffff)
   - Set navigation bar to black (#000000)
   - Verify both bars have different colors

2. Test color changes:
   - Change status bar to red (#ff0000)
   - Change navigation bar to blue (#0000ff)
   - Verify colors update correctly

3. Test legacy method:
   - Use "Set Background Color" with a color (e.g., #808080)
   - Verify both bars change to the same color

4. Test enable/disable:
   - Enable edge-to-edge mode
   - Disable edge-to-edge mode
   - Verify the UI adjusts appropriately

## Development

To run the development server:
```bash
npm start
```

This will open the app in your browser at http://localhost:3000. Note that Capacitor plugins will only work on native platforms (Android/iOS), not in the browser.
