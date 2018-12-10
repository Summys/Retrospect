import { FORGOT_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';

/* eslint-disable global-require */
export default {
  component: {
    id: FORGOT_SCREEN,
    name: FORGOT_SCREEN,
    options: {
      topBar: {
        title: {
          text: FORGOT_SCREEN,
        },
        ...StackConfig,
      },
    },
  },
};
