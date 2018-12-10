import { VERIFY_SCREEN } from '../../../helpers/setScreens';
import StackConfig from '../options/StackConfig';

/* eslint-disable global-require */
export default {
  component: {
    id: VERIFY_SCREEN,
    name: VERIFY_SCREEN,
    options: {
      topBar: {
        title: {
          text: VERIFY_SCREEN,
        },
        ...StackConfig,
      },
    },
  },
};
