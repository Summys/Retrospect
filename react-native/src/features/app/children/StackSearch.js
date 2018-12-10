import { SEARCH_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';
import BottomTabConfig from '../options/BottomTabConfig';

/* eslint-disable global-require */
export default {
  stack: {
    children: [
      {
        component: {
          name: SEARCH_SCREEN,
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
        text: 'Search',
        testID: 'SEARCH_TAB',
        icon: require('../../../assets/search.png'),
      },
    },
  },
};
