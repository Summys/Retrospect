import { Navigation } from 'react-native-navigation';
import Login from './children/ComponentLogin';

export default () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AUTH',
        children: [Login],
      },
    },
  });
};
