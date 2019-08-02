# Calendar-Application
Powered by me with react-native


## Getting started

1. Install React Native as described at [https://facebook.github.io/react-native/docs/getting-started.html#content](https://facebook.github.io/react-native/docs/getting-started.html#content)
2. Clone this repository
3. Run `yarn install` , all required components will be installed automatically

    ### iOS
      
    1. Run `pod install` from `Calendar-Application/ios` folder
    2. Run `yarn ios` to run emulator (installed XCode is required)
    3. You can also just start XCode and open genenerated `calendar.xcworkspace` from `ios` folder to run on device directly. [More info](https://facebook.github.io/react-native/docs/running-on-device)
    


    ### Android
    
    1. Open emulator in Android Studio or connect device. [More info](https://facebook.github.io/react-native/docs/running-on-device)
    2. Run `yarn start` and `yarn android`
    3. To generate unsigned release apk run `yarn apk`. Output path is `android/app/build/output/release`
