import { SETTINGS_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';
import BottomTabConfig from '../options/BottomTabConfig';

/* eslint-disable global-require */
export default {
  stack: {
    children: [
      {
        component: {
          name: SETTINGS_SCREEN,
          options: {
            topBar: {
              ...StackConfig,
            },
          },
        },
      },
    ],
    options: {
      bottomTab: {
        ...BottomTabConfig,
        text: 'Settings',
        testID: 'SETTINGS_TAB',
        icon: require('../../../assets/settings.png'),
      },
    },
  },
};
