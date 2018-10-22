import { STORIES_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';
import BottomTabConfig from '../options/BottomTabConfig';

/* eslint-disable global-require */
export default {
  stack: {
    children: [
      {
        component: {
          name: STORIES_SCREEN,
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
        text: 'Stories',
        testID: 'STORIES_TAB',
        icon: require('../../../assets/stories.png'),
      },
    },
  },
};
