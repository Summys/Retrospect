import { STORIES_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';
import BottomTabConfig from '../options/BottomTabConfig';

/* eslint-disable global-require */
export default {
  stack: {
    children: [
      {
        component: {
          id: STORIES_SCREEN,
          componentId: STORIES_SCREEN,
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
        componentId: STORIES_SCREEN,
        testID: 'STORIES_TAB',
        icon: require('../../../assets/stories.png'),
      },
    },
  },
};
