import { Navigation } from 'react-native-navigation';
import StorybookUIHMRRoot from './storybook';

Navigation.registerComponent('storybook.UI', () => StorybookUIHMRRoot);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'storybook.UI',
      },
    },
  });
});
