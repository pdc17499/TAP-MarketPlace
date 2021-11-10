import {ReactElement} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import { StringLocale } from 'yup/lib/locale';

export interface screenNavigationProp {
  navigate: any;
}

export interface ButtonProps {
  title?: string;
  containerStyle?: ViewStyle;
  customStyleButton?: ViewStyle | ViewStyle[];
  customStyleTitle?: any;
  onPress?: any;
  disabled?: boolean;
  image?: any;
  size?: 'base' | 'small';
  typeButton?: 'linear' | 'full';
  isActive?: boolean;
  iconRight?: 'right' | 'email' | 'arNextBlack' | 'arNext' | 'upload' | 'photo' | 'tick' | 'other';
  imageStyle?: ImageStyle;
}

export interface IAppInput {
  label?: string;
  placeholder?: string;
  value?: string;
  secureTextEntry?: boolean;
  type?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  style?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  showEye?: boolean;
  onValueChange?: (e: any, name?: string) => void;
  keyboardType?: any;
  editable?: boolean;
  iconLeft?: 'map' | 'key' | 'email' | 'dolar' | 'other';
  iconRight?: 'clear' | 'other';
  name?: string;
  autoFocus?: boolean;
}

export interface AppSwiperProps {
  children: any;
  showPagination?: boolean;
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
  iconFillColor?: string;
}

export interface mockProps {
  id?: number;
  value?: string;
}

export interface DataSignupProps {
  location: {
    lat: number;
    long: number;
    title: string;
  };
  kind_place: mockProps;
  rental_price: mockProps;
  negotiable_price: string;
  fixed_price: string;
  min_range_price: number;
  max_range_price: number;
  lease_your_place: mockProps;
  staying_with_guests: mockProps;
  room_type: mockProps;
  bedroom_number: mockProps;
  bathroom_number: mockProps;
  floor_size_min: number;
  floor_size_max: number;
  attached_room: mockProps; 
  room_furnishing: mockProps;
  floor_level: mockProps;
  allow_cooking: mockProps;
  built_year: string;
  key_your_place: Array<mockProps>;
}

export interface AppQAProps {
  data: Array<mockProps>;
  title: string;
  subTitle?: string;
  value: any;
  setValue: any;
  typeList?: 'column' | 'wrap' | 'even' | 'row';
  isMultiChoice?: boolean;
  children?: ReactElement;
  customStyleTitle?: TextStyle;
  customStyleViewButton?: ViewStyle;
  name: string;
  isFlex?: boolean;
}

export interface RoomStepProps {
  onNext: () => void;
}

export interface VerifyAccountProps {
  countryCode: string;
  onChangeValue: (item: string) => void;
  setCountryCode?: (item: string) => void;
}
