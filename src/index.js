import { StatusBar } from 'react-native';
import './helpers/makeHMR';
/* eslint-disable global-require */

// import CodePush from 'react-native-code-push';
// import { Component } from 'react';
import './features/splash';

StatusBar.setBarStyle('dark-content', true);

// const codePushOptions = {
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
//   updateDialog: true,
//   installMode: CodePush.InstallMode.IMMEDIATE,
// };

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.appState = AppState.currentState;
//     AppState.addEventListener('change', this.handleAppStateChange);
//     this.codePushSync();
//     startApp();
//   }

//   handleAppStateChange = nextAppState => {
//     if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
//       this.handleOnResume();
//     }
//     this.appState = AppState.currentState;
//   };

//   codePushSync = () => {
//     CodePush.sync(codePushOptions);
//   };

//   handleOnResume = () => {
//     this.codePushSync();
//   };
// }
