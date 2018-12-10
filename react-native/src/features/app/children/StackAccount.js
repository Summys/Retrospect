import { ACCOUNT_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';
import BottomTabConfig from '../options/BottomTabConfig';

/* eslint-disable global-require */
export default {
  stack: {
    children: [
      {
        component: {
          name: ACCOUNT_SCREEN,
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
        text: 'Account',
        testID: 'ACCOUNT_TAB',
        icon: require('../../../assets/user.png'),
      },
    },
  },
};
