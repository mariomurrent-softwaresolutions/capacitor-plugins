# Ionic React Test App for Edge To Edge Plugin

## Overview

This Ionic React test application was created to test the status bar and navigation bar color functionality added in PR #1 to the `@capawesome/capacitor-android-edge-to-edge-support` plugin.

## What's Been Implemented

### 1. App Structure
- **Framework**: Ionic React with TypeScript
- **Build Tool**: React Scripts (Create React App)
- **Native Platform**: Capacitor for Android
- **Plugin Integration**: Configured to use the local android-edge-to-edge-support plugin

### 2. Features Implemented

The test app provides a comprehensive UI to test all the new functionality:

#### Status Bar Color Control
- Input field to specify status bar color (hex format)
- Button to apply the status bar color
- Uses the new `setStatusBarColor()` method from PR #1

#### Navigation Bar Color Control
- Input field to specify navigation bar color (hex format)
- Button to apply the navigation bar color
- Uses the new `setNavigationBarColor()` method from PR #1

#### Legacy Background Color Control
- Input field to specify background color for both bars (hex format)
- Button to apply the color to both bars
- Uses the deprecated `setBackgroundColor()` method (maintained for backward compatibility)

#### Edge-to-Edge Controls
- Enable button: Activates edge-to-edge mode
- Disable button: Deactivates edge-to-edge mode
- Get Insets button: Displays current window insets

### 3. Technical Implementation

#### Component Structure (`src/App.tsx`)
```typescript
- Uses React hooks (useState) for state management
- Imports Ionic React components (IonApp, IonButton, IonInput, etc.)
- Imports the EdgeToEdge plugin from the local package
- Implements async/await handlers for all plugin methods
- Includes error handling with console logging and alerts
```

#### Configuration (`capacitor.config.ts`)
```typescript
- App ID: io.capawesome.test.edgetoedge
- App Name: EdgeToEdge Test App
- Web Directory: build
- Plugin Configuration:
  - EdgeToEdge enabled: true
```

#### Dependencies
- `@ionic/react`: Ionic UI components for React
- `@ionic/react-router`: Routing for Ionic React apps
- `@capacitor/core`: Capacitor core functionality
- `@capacitor/android`: Android platform support
- `@capacitor/status-bar`: Status bar plugin (additional functionality)
- `@capawesome/capacitor-android-edge-to-edge-support`: The plugin being tested (linked from parent directory)

### 4. File Structure

```
react-test-app/
├── README-TEST-APP.md          # Test app documentation
├── README.md                    # Default React app readme
├── package.json                 # Dependencies and scripts
├── capacitor.config.ts          # Capacitor configuration
├── tsconfig.json                # TypeScript configuration
├── public/                      # Static assets
├── src/
│   ├── App.tsx                  # Main application component with test UI
│   ├── index.tsx                # Entry point
│   ├── App.css                  # Styles
│   └── ...                      # Other React files
└── android/                     # Android native project
    ├── app/
    │   ├── build.gradle
    │   ├── src/
    │   │   └── main/
    │   │       ├── AndroidManifest.xml
    │   │       ├── java/
    │   │       └── res/
    │   └── ...
    ├── build.gradle
    ├── settings.gradle
    └── ...
```

## How to Use

### Prerequisites
- Node.js and npm installed
- Android Studio installed (for running on Android)
- An Android device or emulator

### Setup Steps

1. **Install Dependencies**
   ```bash
   cd react-test-app
   npm install
   ```

2. **Build the Plugin** (if not already built)
   ```bash
   cd ..  # Go back to android-edge-to-edge-support directory
   npm run build
   cd react-test-app
   ```

3. **Build the React App**
   ```bash
   npm run build
   ```

4. **Sync with Capacitor**
   ```bash
   npx cap sync android
   ```

5. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

6. **Run the App**
   - In Android Studio, select your device/emulator
   - Click the "Run" button
   - The app will install and launch on your device

### Testing Scenarios

#### Scenario 1: Test Independent Status and Navigation Bar Colors
1. Launch the app
2. In the "Status Bar Color" field, enter: `#ffffff` (white)
3. Click "Set Status Bar Color"
4. In the "Navigation Bar Color" field, enter: `#000000` (black)
5. Click "Set Navigation Bar Color"
6. **Expected Result**: Status bar should be white, navigation bar should be black

#### Scenario 2: Test Color Changes
1. Change status bar color to: `#ff0000` (red)
2. Click "Set Status Bar Color"
3. Change navigation bar color to: `#0000ff` (blue)
4. Click "Set Navigation Bar Color"
5. **Expected Result**: Colors should update to red and blue respectively

#### Scenario 3: Test Legacy Background Color Method
1. In the "Background Color (Both Bars)" field, enter: `#808080` (gray)
2. Click "Set Background Color (Legacy)"
3. **Expected Result**: Both status bar and navigation bar should turn gray

#### Scenario 4: Test Enable/Disable Edge-to-Edge
1. Click "Disable" button
2. **Expected Result**: Edge-to-edge mode disabled, bars may appear differently
3. Click "Enable" button
4. **Expected Result**: Edge-to-edge mode re-enabled

#### Scenario 5: Test Get Insets
1. Click "Get Insets" button
2. **Expected Result**: An alert displays the current window insets (top, bottom, left, right values)

### Additional Testing Tips

- **Test Different Color Formats**: Try different hex colors like `#00ff00`, `#ffff00`, etc.
- **Test Edge Cases**: Try empty values, invalid colors, etc.
- **Test State Persistence**: Change colors, minimize/restore the app, check if colors persist
- **Test with Different Android Versions**: Test on devices with different Android versions (API 21+)
- **Check Console Logs**: Use Android Studio's Logcat to see console output from the app

## Code Highlights

### Main Component (App.tsx)

The main component demonstrates all the plugin functionality:

```typescript
// State management for colors
const [statusBarColor, setStatusBarColor] = useState('#ffffff');
const [navigationBarColor, setNavigationBarColor] = useState('#000000');
const [backgroundColor, setBackgroundColor] = useState('#808080');

// Handler for setting status bar color (NEW in PR #1)
const handleSetStatusBarColor = async () => {
  try {
    await EdgeToEdge.setStatusBarColor({ color: statusBarColor });
    console.log('Status bar color set to:', statusBarColor);
  } catch (error) {
    console.error('Error setting status bar color:', error);
  }
};

// Handler for setting navigation bar color (NEW in PR #1)
const handleSetNavigationBarColor = async () => {
  try {
    await EdgeToEdge.setNavigationBarColor({ color: navigationBarColor });
    console.log('Navigation bar color set to:', navigationBarColor);
  } catch (error) {
    console.error('Error setting navigation bar color:', error);
  }
};

// Handler for setting background color (LEGACY method, still supported)
const handleSetBackgroundColor = async () => {
  try {
    await EdgeToEdge.setBackgroundColor({ color: backgroundColor });
    console.log('Background color (both bars) set to:', backgroundColor);
  } catch (error) {
    console.error('Error setting background color:', error);
  }
};
```

## What Makes This App Useful for Testing PR #1

1. **Direct Testing of New APIs**: The app provides direct access to the new `setStatusBarColor()` and `setNavigationBarColor()` methods introduced in PR #1.

2. **Visual Verification**: Users can immediately see the results of their actions, making it easy to verify that the colors are being applied correctly.

3. **Comparison with Legacy Method**: The app includes the deprecated `setBackgroundColor()` method, allowing testers to compare the old behavior with the new functionality.

4. **Comprehensive Coverage**: All major plugin features are accessible, including enable/disable and get insets.

5. **Error Handling**: The app includes proper error handling and logging, making it easier to debug issues during testing.

6. **Ionic Integration**: Demonstrates how to use the plugin in a real-world Ionic React application.

## Notes

- The app uses Ionic React components for a consistent mobile UI experience
- All plugin calls are asynchronous and include error handling
- The app layout includes a header and footer to help visualize the edge-to-edge effect
- Default colors are pre-populated for quick testing (white status bar, black navigation bar)

## Troubleshooting

### Build Issues
- If you encounter build errors, make sure the parent plugin is built first: `cd .. && npm run build`
- Ensure all dependencies are installed: `npm install`
- Clear Capacitor cache: `npx cap sync --force`

### Runtime Issues
- Check Android Studio's Logcat for detailed error messages
- Ensure the plugin is properly registered (check `capacitor.plugins.json`)
- Verify that edge-to-edge mode is supported on your Android device (API 21+)

### Plugin Not Found
- Make sure the plugin is linked correctly in `package.json` as `file:..`
- Run `npm install` to ensure the local plugin is properly linked
- Run `npx cap sync` to update the native project

## Future Enhancements

Potential improvements for the test app:
- Add color picker UI for easier color selection
- Add preset color buttons for quick testing
- Display current colors visually
- Add animation controls
- Add light/dark mode toggle
- Include screenshots and before/after comparisons
