import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

export type RootStackParams = {
  Login: undefined
  Home: undefined
}

export interface IconData {
  translation: string;
  icon: ImageSourcePropType;
}