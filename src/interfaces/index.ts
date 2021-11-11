import {ReactElement} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';

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
  typeButton?: 'linear' | 'full' | 'underline';
  isActive?: boolean;
  iconRight?:
    | 'right'
    | 'email'
    | 'arNextBlack'
    | 'arNext'
    | 'upload'
    | 'photo'
    | 'tick'
    | 'other';
  imageStyle?: ImageStyle;
}

export interface IAppInput {
  label?: string;
  placeholder?: string;
  value?: any;
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
  iconLeft?: 'map' | 'key' | 'email' | 'dolar' | 'floor_size' | 'other';
  iconRight?: 'clear' | 'other';
  name?: string;
  autoFocus?: boolean;
  typeInput?: 'default' | 'price' | 'phone' | 'password';
  delimiter?: string;
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
  role_user: 0 | 1 | 2 | 3;
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
  list_photo: Array<ImageOrVideo>;
  user_name: string;
  gender: mockProps;
  age_group: mockProps;
  country: any;
  occupation: any;
  ethnicity: any;
  your_place: mockProps;
  have_pet: mockProps;
  smoke: mockProps;
  diet_choice: mockProps;
  your_religion: mockProps;
  email: string;
  password: string;
  confirm_password: string;
}

export interface AppQAProps {
  data: Array<mockProps>;
  title: string;
  subTitle?: string;
  typeTitle?: 'base' | 'strong';
  value: any;
  setValue: any;
  typeList?: 'column' | 'wrap' | 'even' | 'row';
  isMultiChoice?: boolean;
  children?: ReactElement;
  customStyleTitle?: TextStyle;
  customStyleViewButton?: ViewStyle;
  name: string;
  isFlex?: boolean;
  error?: string;
}

export interface RoomStepProps {
  onNext: () => void;
}

export interface VerifyAccountProps {
  countryCode: string;
  onChangeValue: (item: string) => void;
  setCountryCode?: (item: string) => void;
}
