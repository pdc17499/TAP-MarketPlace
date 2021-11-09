import {ReactElement} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {JsxElement} from 'typescript';

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
  iconRight?: 'right' | 'email' | 'arrowBlack' | 'arrowGray' | 'other';
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
  onValueChange: (e: any, name?: string) => void;
  keyboardType?: any;
  editable?: boolean;
  iconLeft?: 'map' | 'key' | 'email' | 'dolar' | 'other';
  iconRight?: 'clear' | 'other';
  name?: string;
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
  id?: number;
  value?: string;
}

export interface homePropertyProps {
  location: {
    lat: number;
    long: number;
    title: string;
  };
  kind_place: mockProps;
  rental_price: mockProps;
  fixed_price: string;
  min_range: string;
  max_range: string;
  lease_your_place: mockProps;
  staying_with_guests: boolean;
  room_type: mockProps;
  floor_size: number;
  bathroom: mockProps;
  room_furnishing: mockProps;
  floor_level: mockProps;
  built_year: string;
  key_your_place: Array<mockProps>;
}

export interface AppQAProps {
  data: Array<mockProps>;
  title: string;
  subTitle?: string;
  selected: any;
  onSelect: (item: mockProps, name: string) => void;
  typeList?: 'column' | 'row';
  isMultiChoice?: boolean;
  children?: ReactElement;
  customStyleTitle?: TextStyle;
  customStyleViewButton?: ViewStyle;
  name: string;
  isFlex?: boolean;
}
