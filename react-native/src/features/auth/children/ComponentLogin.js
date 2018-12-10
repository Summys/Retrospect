import { LOGIN_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';

/* eslint-disable global-require */
export default {
  component: {
    id: LOGIN_SCREEN,
    name: LOGIN_SCREEN,
    options: {
      topBar: {
        title: {
          text: LOGIN_SCREEN,
        },
        ...StackConfig,
      },
    },
  },
};
