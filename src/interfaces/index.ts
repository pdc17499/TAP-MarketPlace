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
  imageStyle?: ImageStyle,
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
  iconLeft?: 'map' | 'other';
  iconRight?: 'clear' | 'other'
}

export interface AppSwiperProps {
  children: any;
}

export interface RefAppSwiper {
  onNextButton: () => void;
}

export interface HeaderProps {
  customTitleStyle?: any;
  title?: string;
  customContainer?: any;
  back?: any;
  btnCountine?: boolean;
  onPressCountine?: () => void;
  btnRight?: any;
  iconRight?: any;
  onPressBack?: () => void;
}
export interface mockProps {
  id: number;
  value: string;
}
