import { Navigation } from 'react-native-navigation';
import Stories from './children/StackStories';
import Account from './children/StackAccount';
import Search from './children/StackSearch';
import Settings from './children/StackSettings';

export default () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'ROOT',
        children: [Stories, Account, Search, Settings],
      },
    },
  });
