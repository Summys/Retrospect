import { REGISTER_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';

/* eslint-disable global-require */
export default {
  component: {
    id: REGISTER_SCREEN,
    name: REGISTER_SCREEN,
    options: {
      topBar: {
        title: {
          text: REGISTER_SCREEN,
        },
        ...StackConfig,
      },
    },
  },
};
