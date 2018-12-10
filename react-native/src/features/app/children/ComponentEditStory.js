import { EDIT_STORY_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';

export default {
  component: {
    componentId: EDIT_STORY_SCREEN,
    id: EDIT_STORY_SCREEN,
    name: EDIT_STORY_SCREEN,
    options: {
      topBar: {
        title: {
          text: EDIT_STORY_SCREEN,
        },
        ...StackConfig,
      },
    },
  },
};
