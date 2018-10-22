import { RESET_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';

/* eslint-disable global-require */
export default {
  component: {
    id: RESET_SCREEN,
    name: RESET_SCREEN,
    options: {
      topBar: {
        title: {
          text: RESET_SCREEN,
        },
        ...StackConfig,
      },
    },
  },
};
