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
    | 'addPhoto'
    | 'addVideo'
    | 'tick'
    | 'other'
    | 'plus';
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
  customStyleLabel?: TextStyle;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  showEye?: boolean;
  onValueChange?: (value: any, name?: string) => void;
  keyboardType?: any;
  editable?: boolean;
  iconLeft?: 'map' | 'key' | 'email' | 'dolar' | 'floor_size' | 'other';
  iconRight?: 'clear' | 'other';
  name?: string;
  autoFocus?: boolean;
  typeInput?: 'default' | 'price' | 'phone' | 'password' | 'linear';
  delimiter?: string;
  onPressRightIcon?: () => void;
}

export interface AppSwiperProps {
  children: any;
  showPagination?: 'hide' | 'right-header' | 'center-top';
  onSkip?: (index: number) => void;
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
  onPressRight?: () => void;
  btnRight?: any;
  iconRight?: 'skip' | 'hide';
  onPressBack?: () => void;
  iconFillColor?: string;
}

export interface mockProps {
  id?: number;
  value?: string;
}
export interface pickerProps {
  label?: string;
  value?: any;
}

export interface DataSignupProps {
  role_user: string;
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
  lease_your_place: Array<mockProps>;
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
  occupation: pickerProps;
  ethnicity: pickerProps;
  your_place: Array<mockProps>;
  have_pet: mockProps;
  smoke: mockProps;
  diet_choice: Array<mockProps>;
  your_religion: mockProps;
  email: string;
  password: string;
  confirm_password: string;
}

export interface AppQAProps {
  data: Array<mockProps>;
  title: string;
  subTitle?: string;
  titleHighlight?: Array<string>;
  value: any;
  setValue: any;
  typeList?: 'column' | 'row' | 'wrap' | 'even';
  isMultiChoice?: boolean;
  children?: ReactElement;
  customStyleTitle?: TextStyle;
  customStyleViewButton?: ViewStyle;
  name: string;
  isFlex?: boolean;
  error?: string;
  typeTitle?: 'base' | 'center-mix' | 'other';
}

export interface UserInfo {
  country: string;
  address: string;
  ageGroup: number;
  contact: string;
  createdAt: string;
  dob: string;
  email: string;
  ethnicity: string;
  facebook_account: string;
  gender: 'male' | 'female' | 'other';
  id: number;
  image: string;
  is_representative: boolean;
  lifestyle: any;
  name: string;
  nationality: string;
  occupation: string;
  password: string;
  rental_account: string;
  updatedAt: string;
}

export interface Token {
  access: {
    expires: string;
    token: string;
  };
  refresh: {
    expires: string;
    token: string;
  };
}

export interface RoomStepProps {
  onNext: () => void;
}

export interface VerifyAccountProps {
  countryCode: string;
  onChangeValue: (item: string) => void;
  setCountryCode?: (item: string) => void;
}
export interface IAppPicker {
  label?: string;
  // value?: any;
  onValueChange: (value: any, name?: string) => void;
  items?: any;
  style?: any;
  placeholder?: any;
  value?: any;
  error?: string;
  styleError?: any;
  name?: string;
  typePicker?: 'base' | 'linear' | 'country';
  disable?: boolean;
  stylePicker?: 'base' | 'linear';
}

export interface ListingRoomProps {
  id: number;
  type: string;
  title: string;
  image: any;
  location: string;
  active: boolean;
}

export interface AppModalProps {
  label?: string;
  title?: string;
  containerStyle?: ViewStyle;
  customStyleButton?: ViewStyle | ViewStyle[];
  customStyleContainer?: ViewStyle | ViewStyle[];
  customStyleTitle?: any;
  children?: JSX.Element;
  customTitle?: JSX.Element;
  onPressDone?: () => void;
}