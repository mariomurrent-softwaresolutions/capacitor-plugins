# React Test App Structure and Implementation

## Project Overview

This document provides a visual overview of the Ionic React test app created for testing the status bar and navigation bar color functionality from PR #1.

## Directory Structure

```
react-test-app/
│
├── README-TEST-APP.md                      # Quick start guide
├── TEST-APP-DOCUMENTATION.md               # Comprehensive documentation
├── package.json                            # Dependencies
├── capacitor.config.ts                     # Capacitor config with plugin settings
├── tsconfig.json                           # TypeScript configuration
│
├── public/                                 # Static assets
│   ├── index.html                          # HTML entry point
│   ├── favicon.ico
│   └── ...
│
├── src/                                    # React source code
│   ├── App.tsx                             # ⭐ Main test UI component
│   ├── index.tsx                           # React entry point
│   ├── App.css                             # Styles
│   └── ...
│
└── android/                                # Native Android project
    ├── app/
    │   ├── build.gradle                    # App-level Gradle config
    │   ├── src/main/
    │   │   ├── AndroidManifest.xml
    │   │   ├── java/io/capawesome/test/edgetoedge/
    │   │   │   └── MainActivity.java
    │   │   └── res/                        # Android resources
    │   └── ...
    ├── build.gradle                        # Project-level Gradle config
    └── ...
```

## App Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        IonApp                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    IonHeader                           │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              IonToolbar                          │  │  │
│  │  │  "Edge To Edge Test App"                        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   IonContent                           │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                  IonList                         │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │ [Enable] Button                          │  │  │  │
│  │  │  │ [Disable] Button                         │  │  │  │
│  │  │  │ [Get Insets] Button                      │  │  │  │
│  │  │  │                                          │  │  │  │
│  │  │  │ Status Bar Color Input: [#ffffff]       │  │  │  │
│  │  │  │ [Set Status Bar Color] Button           │  │  │  │
│  │  │  │                                          │  │  │  │
│  │  │  │ Navigation Bar Color Input: [#000000]   │  │  │  │
│  │  │  │ [Set Navigation Bar Color] Button       │  │  │  │
│  │  │  │                                          │  │  │  │
│  │  │  │ Background Color Input: [#808080]       │  │  │  │
│  │  │  │ [Set Background Color (Legacy)] Button  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    IonFooter                           │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              IonToolbar                          │  │  │
│  │  │  "Footer"                                       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Key Features Implementation

### 1. State Management
```typescript
const [statusBarColor, setStatusBarColor] = useState('#ffffff');
const [navigationBarColor, setNavigationBarColor] = useState('#000000');
const [backgroundColor, setBackgroundColor] = useState('#808080');
```

### 2. Plugin Import
```typescript
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
```

### 3. Event Handlers

#### New Features from PR #1:
- `handleSetStatusBarColor()` - Sets status bar color independently
- `handleSetNavigationBarColor()` - Sets navigation bar color independently

#### Legacy Feature:
- `handleSetBackgroundColor()` - Sets both bars to same color (deprecated but supported)

#### Other Features:
- `handleEnable()` - Enable edge-to-edge mode
- `handleDisable()` - Disable edge-to-edge mode
- `handleGetInsets()` - Get window insets

## Plugin Integration Flow

```
┌──────────────────────┐
│   React Component    │
│      (App.tsx)       │
└──────────┬───────────┘
           │
           │ Import
           ▼
┌──────────────────────┐
│   EdgeToEdge Plugin  │
│  (@capawesome/...)   │
└──────────┬───────────┘
           │
           │ Capacitor Bridge
           ▼
┌──────────────────────┐
│   Native Android     │
│   Implementation     │
│  (EdgeToEdgePlugin)  │
└──────────┬───────────┘
           │
           │ Call Native Methods
           ▼
┌──────────────────────┐
│    Android System    │
│   (Status Bar &      │
│  Navigation Bar API) │
└──────────────────────┘
```

## Testing Workflow

```
1. User Opens App
   └─> App renders with default color values

2. User Changes Status Bar Color
   └─> Types in input field (e.g., "#ff0000")
   └─> State updates via setStatusBarColor()
   └─> User clicks "Set Status Bar Color"
   └─> handleSetStatusBarColor() is called
   └─> EdgeToEdge.setStatusBarColor() is invoked
   └─> Native Android code updates status bar
   └─> User sees red status bar

3. User Changes Navigation Bar Color
   └─> Types in input field (e.g., "#0000ff")
   └─> State updates via setNavigationBarColor()
   └─> User clicks "Set Navigation Bar Color"
   └─> handleSetNavigationBarColor() is called
   └─> EdgeToEdge.setNavigationBarColor() is invoked
   └─> Native Android code updates navigation bar
   └─> User sees blue navigation bar

4. User Tests Legacy Method
   └─> Types in background color input (e.g., "#808080")
   └─> State updates via setBackgroundColor()
   └─> User clicks "Set Background Color (Legacy)"
   └─> handleSetBackgroundColor() is called
   └─> EdgeToEdge.setBackgroundColor() is invoked
   └─> Native Android code updates both bars
   └─> User sees both bars turn gray
```

## Dependencies Graph

```
react-test-app
├── React + React DOM
├── @ionic/react
│   ├── @ionic/core
│   └── ionicons
├── @capacitor/core
├── @capacitor/cli
├── @capacitor/android
├── @capacitor/status-bar
└── @capawesome/capacitor-android-edge-to-edge-support (local)
    ├── @capacitor/core
    └── Android native code
```

## Configuration Files

### capacitor.config.ts
```typescript
{
  appId: 'io.capawesome.test.edgetoedge',
  appName: 'EdgeToEdge Test App',
  webDir: 'build',
  plugins: {
    EdgeToEdge: {
      enabled: true
    }
  }
}
```

### package.json (key dependencies)
```json
{
  "dependencies": {
    "@ionic/react": "^8.x.x",
    "@capacitor/core": "7.0.0",
    "@capacitor/android": "7.0.0",
    "@capacitor/status-bar": "7.0.0",
    "@capawesome/capacitor-android-edge-to-edge-support": "file:.."
  }
}
```

## What This Tests

✅ **New functionality from PR #1:**
- Independent status bar color control
- Independent navigation bar color control
- Separate API methods for each bar

✅ **Backward compatibility:**
- Legacy `setBackgroundColor()` method still works
- Both bars can still be set to the same color

✅ **Core functionality:**
- Enable/disable edge-to-edge mode
- Get window insets
- Plugin integration with Capacitor

✅ **User experience:**
- Ionic React UI components
- Real-time color updates
- Error handling and logging
- Visual feedback

## Build and Run Commands

```bash
# Install dependencies
npm install

# Build React app
npm run build

# Sync with Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android

# Run from Android Studio
# Click the "Run" button
```

## Expected Behavior on Android

When running the app:
1. App launches with Ionic UI
2. Header and footer are visible
3. Buttons are responsive
4. Status bar and navigation bar colors can be changed independently
5. Edge-to-edge mode can be toggled
6. Insets can be retrieved and displayed

## Notes

- Build artifacts are excluded from git via .gitignore
- node_modules is excluded from git
- Android build directory is excluded from git
- Only source files and configuration are committed
