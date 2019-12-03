# Sprive

## Getting Started

### Installation Steps

1. Make Sure you have react-native-cli or `npm install -g react-native-cli`.
2. Clone Sprive repository using `git clone {URL}`
3. Move to Sprive directory uisng `cd Sprive`
4. Install your dependencies using `npm install`
5. Move to IOS direcotory using `cd ios`
6. Install and update pod files using `pod install` and `pod update` respectively

### Running the React-App

#### Android

1.  Plug in your device via USB
2.  Enable Debugging over USB
3.  Check list of attached devices using `adb devices`
4.  Run your app using `react-native run-android`

#### IOS

1. Open Xcode
2. Open `Sprive.xcworkspace` under IOS directory of the project in Xcode
3. Select `Simulator` from the list of simulator provided under Sprive
4. Tap `Run` under `Product`

### Folder Structure

1. index.js is the main file.
2. src folder contains all the necessary files/folders.
3. assets folder is to store assets related to the app.
4. components folder will store the common layouts which is used within the app.
5. screens folder contain all screens.
6. apiServices folder contains all network calls for the app.
7. navigation folder container all routes and navigation services required in the app.
8. utils folder contains all utililities(like - constants, helperFunctions, styles, locales, and DB keys)
9. store folder contains all Redux store configs(actions and reducers) - Middleware used is Redux-thunk
10. All api configs are in the configs folder in root directory

### API URL

In below file :
config\urlEndPoints.ts

Replace URL `localApiUrl`
