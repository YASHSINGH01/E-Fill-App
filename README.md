#  EFill Mobile App

>Efill offers EV charging service that offers a wide variety of features like charging stations near you, EV Qucik charging, EV Charging booking, Listing third party charges – on thousands of internet-connected devices. You can book a charging slot as much as you want, whenever you want, without a single ad – all at one place. There's always something new to discover, and new charging stations and offers are added every other day!

## DEPENDENCIES

EFill uses a number of open source projects to work properly:

*  @react-native-async-storage/async-storage :  ^1.15.4 
*  @react-native-community/datetimepicker :  ^3.0.8 
*  @react-native-community/geolocation :  ^2.0.2 
*  @react-native-community/masked-view :  ^0.1.10 
*  @react-native-community/netinfo :  ^5.9.10 
*  @react-native-community/picker :  ^1.6.6 
*  @react-native-community/push-notification-ios :  ^1.8.0 
*  @react-native-community/slider :  ^3.0.3 
*  @react-native-firebase/app :  ^10.4.0 
*  @react-native-firebase/database :  ^10.4.0 
*  @react-native-firebase/messaging :  ^10.3.1 
*  @react-navigation/drawer :  ^5.9.0 
*  @react-navigation/material-bottom-tabs :  ^5.2.16 
*  @react-navigation/native :  ^5.7.3 
*  @react-navigation/stack :  ^5.9.0 
*  axios :  ^0.20.0 
*  firebase :  ^8.2.6 
*  geolib :  ^3.3.1 
*  moment :  ^2.29.1 
*  react :  17.0.1 
*  react-native :  0.64.1 
*  react-native-animatable :  ^1.3.3 
*  react-native-app-intro-slider :  ^4.0.4 
*  react-native-background-timer :  ^2.4.1 
*  react-native-calendars :  ^1.403.0 
*  react-native-camera :  ^3.39.0 
*  react-native-datepicker :  ^1.7.2 
*  react-native-device-info :  ^7.3.1 
*  react-native-elements :  ^2.2.1 
*  react-native-flash-message :  ^0.1.16 
*  react-native-geocoding :  ^0.5.0 
*  react-native-gesture-handler :  ^1.7.0 
*  react-native-image-picker :  ^2.3.4 
*  react-native-image-viewing :  ^0.2.0 
*  react-native-keyboard-aware-scroll-view :  ^0.9.3 
*  react-native-linear-gradient :  ^2.5.6 
*  react-native-localization :  ^2.1.6 
*  react-native-map-clustering :  ^3.4.2 
*  react-native-maps :  0.27.1 
*  react-native-modal-datetime-picker :  ^9.1.0 
*  react-native-modalize :  ^2.0.8 
*  react-native-paper :  ^4.0.1 
*  react-native-permissions :  ^2.2.0 
*  react-native-picker-select :  ^8.0.0 
*  react-native-push-notification :  ^7.0.0 
*  react-native-qrcode-scanner :  ^1.6.0 
*  react-native-razorpay :  ^2.2.1 
*  react-native-reanimated :  ^1.13.0 
*  react-native-safe-area-context :  ^3.1.4 
*  react-native-screens :  ^2.10.1 
*  react-native-star-rating :  ^1.1.0 
*  react-native-svg :  ^12.1.0 
*  react-native-svg-transformer :  ^0.14.3 
*  react-native-tab-view :  ^2.15.1 
*  react-native-vector-icons :  ^7.0.0 
*  react-native-version-check :  ^3.4.2 
*  react-native-websocket :  ^1.0.2 
*  react-native-webview :  ^10.9.0 
*  react-redux :  ^5.0.4 
*  redux :  ^3.7.2 
*  redux-thunk :  ^2.2.0 
*  rn-range-slider :  ^1.3.2 

## USAGE

### Clone
You can start by cloning this repository. In the current state of this project, it should give you no issues at all, just run the script, delete your node modules and reinstall them and you should be good to go.

Keep in mind that this library can cause trouble if you are renaming a project that uses Pods on the iOS side.

After that you should proceed as with any javascript project:

- Go to your project's root folder and run `npm install`.
- If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
- Run `npx react-native run-ios` or `npx react-native run-android` to start your application!

## Folder structure

This template follows a very simple project structure:
- index.js : Entry point of your application as per React-Native standards.
- App.js : Main component that starts your whole app.
- assets : Asset folder to store all images, vectors, etc.
- src : This folder is the main container of all the code inside your application.
  - components : Folder to store any common component that you use through your app (such as a generic button)
  - constants : Folder to store any kind of constant that you have.
  - utils : Folder to store all your network calls, Local Storage, Animations.
  - Redux : This folder should have all your reducers, actions and expose the combined result using its index.js
  - screens : Folder that contains all your application screens/features.
   - Screen : Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests.
    - index.js : This file contains the functionality component for the each module
    - styles.js : This file contains the styles applied to each component.

Go to your project's root folder and run npm install.

If you are using Xcode 12.5 or higher got to /ios and execute pod install --repo-update`
Run npm run ios or npm run android to start your application!

## Generate production version

These are the steps to generate `.apk`, `.aab` and `.ipa` files

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Clean the gradle first: ./gradlew clean
4. Execute `./gradlew assembleRelease` or `./gradlew bundleRelease`

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

### iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive


### Authors
- Shubham Tiwari , Stintlief Technologies LLP

**Cheers, Happy Coding!**