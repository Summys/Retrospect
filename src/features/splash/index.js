import { Navigation } from 'react-native-navigation';
import { SPLASH_SCREEN } from '../../helpers/setScreens';
/* eslint-disable global-require */
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: SPLASH_SCREEN,
        },
      },
    });
  });

