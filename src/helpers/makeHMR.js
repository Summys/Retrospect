import { Navigation } from 'react-native-navigation';
import { redraw, makeHot, clearCacheFor } from 'haul/hot';
import Stories from '../screens/stories';
import Search from '../screens/search';
import Account from '../screens/account';
import Settings from '../screens/settings';
import Login from '../screens/login';
import Register from '../screens/register';
import ResetPassword from '../screens/reset';
import VerifyAccount from '../screens/verify';
import ForgotPassword from '../screens/forgot';
import SplashScreen from '../screens/splash';
import {
  STORIES_SCREEN,
  SEARCH_SCREEN,
  ACCOUNT_SCREEN,
  SETTINGS_SCREEN,
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  FORGOT_SCREEN,
  RESET_SCREEN,
  VERIFY_SCREEN,
  SPLASH_SCREEN,
} from './setScreens';

/* eslint-disable global-require */
const Screens = new Map();
Screens.set(STORIES_SCREEN, Stories);
Screens.set(SEARCH_SCREEN, Search);
Screens.set(ACCOUNT_SCREEN, Account);
Screens.set(SETTINGS_SCREEN, Settings);
Screens.set(LOGIN_SCREEN, Login);
Screens.set(REGISTER_SCREEN, Register);
Screens.set(RESET_SCREEN, ResetPassword);
Screens.set(VERIFY_SCREEN, VerifyAccount);
Screens.set(FORGOT_SCREEN, ForgotPassword);
Screens.set(SPLASH_SCREEN, SplashScreen);
Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, makeHot(() => ScreenComponent, key))
);

if (module.hot) {
  module.hot.accept('../screens/stories', () => {
    clearCacheFor(require.resolve('../screens/stories'));
    redraw(() => require('../screens/stories').default, STORIES_SCREEN);
  });
  module.hot.accept('../screens/search', () => {
    clearCacheFor(require.resolve('../screens/search'));
    redraw(() => require('../screens/search').default, SEARCH_SCREEN);
  });
  module.hot.accept('../screens/account', () => {
    clearCacheFor(require.resolve('../screens/account'));
    redraw(() => require('../screens/account').default, ACCOUNT_SCREEN);
  });
  module.hot.accept('../screens/settings', () => {
    clearCacheFor(require.resolve('../screens/settings'));
    redraw(() => require('../screens/settings').default, SETTINGS_SCREEN);
  });
  module.hot.accept('../screens/login', () => {
    clearCacheFor(require.resolve('../screens/login'));
    redraw(() => require('../screens/login').default, LOGIN_SCREEN);
  });
  module.hot.accept('../screens/register', () => {
    clearCacheFor(require.resolve('../screens/register'));
    redraw(() => require('../screens/register').default, REGISTER_SCREEN);
  });
  module.hot.accept('../screens/forgot', () => {
    clearCacheFor(require.resolve('../screens/forgot'));
    redraw(() => require('../screens/forgot').default, FORGOT_SCREEN);
  });
  module.hot.accept('../screens/reset', () => {
    clearCacheFor(require.resolve('../screens/reset'));
    redraw(() => require('../screens/reset').default, RESET_SCREEN);
  });
  module.hot.accept('../screens/verify', () => {
    clearCacheFor(require.resolve('../screens/verify'));
    redraw(() => require('../screens/verify').default, VERIFY_SCREEN);
  });
  module.hot.accept('../screens/splash', () => {
    clearCacheFor(require.resolve('../screens/splash'));
    redraw(() => require('../screens/splash').default, VERIFY_SCREEN);
  });
}
