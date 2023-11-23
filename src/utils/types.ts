import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

export interface MyUser {
  cedula: string
  codigo: string,
  conexion: string
  sede: string
}

export interface IconData {
  translation: string
  icon: ImageSourcePropType
}