import {ImageStyle, ViewStyle} from 'react-native';

export interface screenNavigationProp {
  navigate: any;
}

export interface ButtonProps {
  title?: string;
  customStyleButton?: any;
  customStyleTitle?: any;
  onPress?: any;
  disabled?: boolean;
  image?: any;
  size?: 'base' | 'small';
  typeButton?: 'linear' | 'full';
  isActive?: boolean;
  iconRight?: any;
  imageStyle?: ImageStyle;
}

export interface IAppInput {
  label?: string;
  placeholder?: string;
  value?: string;
  secureTextEntry?: boolean;
  type?: string;
  style?: ViewStyle | ViewStyle[];
  inputStyle?: ViewStyle | ViewStyle[];
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  showEye?: boolean;
  onValueChange: (e: any) => void;
  keyboardType?: any;
  editable?: boolean;
  iconLeft?: any;
}
