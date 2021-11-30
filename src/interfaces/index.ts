import {ReactElement} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export interface screenNavigationProp {
  navigate: any;
}

export interface ButtonProps {
  title?: string;
  label?: string;
  containerStyle?: ViewStyle;
  customStyleButton?: ViewStyle | ViewStyle[];
  customStyleLabel?: TextStyle;
  customStyleTitle?: TextStyle;
  onPress?: any;
  disabled?: boolean;
  image?: any;
  size?: 'base' | 'small';
  typeButton?: 'linear' | 'full' | 'underline' | 'link';
  isActive?: boolean;
  iconLeft?: any;
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
  maxLength?: number;
  callBackOnFocus?: (focus: boolean) => void;
  onEndEditing?: (name?: string) => void;
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
  customContainer?: ViewStyle;
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
  icon?: any;
  iconSelected?: any;
}
export interface pickerProps {
  label?: string;
  value?: any;
  icon?: any;
  iconSelected?: any;
}

export interface DataSignupProps {
  role_user: string;
  location: {
    lat: number;
    long: number;
    title: string;
  };
  kind_place: mockProps;
  kind_place_tenant: Array<string>;
  rental_price: mockProps;
  negotiable_price: string;
  fixed_price: string;
  min_range_price: number;
  max_range_price: number;
  lease_your_place: Array<string>;
  staying_with_guests: mockProps;
  room_type: mockProps;
  bedroom_number_tenant: Array<string>;
  bedroom_number: mockProps;
  bathroom_number_tenant: Array<string>;
  bathroom_number: mockProps;
  floor_size_min: number;
  floor_size_max: number;
  attached_bathroom: mockProps;
  room_furnishing: mockProps;
  floor_level: mockProps;
  allow_cooking: mockProps;
  built_year: string;
  key_your_place: Array<string>;
  list_photo: Array<ImageOrVideo>;
  user_name: string;
  gender: mockProps;
  age_group: mockProps;
  country: string;
  occupation: pickerProps;
  ethnicity: pickerProps;
  your_place: Array<string>;
  have_pet: mockProps;
  smoke: mockProps;
  diet_choice: Array<string>;
  your_religion: mockProps;
  email: string;
  password: string;
  confirm_password: string;
  avatar: string;
  phone: string;
  life_style: Array<string>;
  preferences: Array<string>;
  agency_name: string;
  license_no: string;
  sale_person_no: string;
}

export interface RoomProps {
  room_type: string;
  bedroom_number: number;
  bathroom_number: number;
  allow_cooking: string;
  amenities: Array<string>;
  gallery: Array<string>;
  room_furnishing: string;
  floor_size_min: number;
  floor_size_max: number;
  floor_level: string;
  built_year: string;
  attached_bathroom: string;
  location: {
    name: string;
    lat: number;
    long: number;
  };
  kind_place: string;
  lease_period: Array<string>;
  min_range_price: number;
  max_range_price: number;
  staying_with_guests: string;
  room_active: boolean;
  rental_price: number;
  rental_type: string;
}

export interface AppQAProps {
  data: Array<mockProps>;
  title?: string;
  subTitle?: string;
  titleHighlight?: Array<string>;
  value?: any;
  setValue?: any;
  typeList?: 'column' | 'row' | 'wrap' | 'even';
  isMultiChoice?: boolean;
  children?: ReactElement;
  customStyleTitle?: TextStyle;
  customStyleTitleButton?: TextStyle;
  customStyleViewButton?: ViewStyle;
  customStyleButton?: ViewStyle | ViewStyle[];
  name?: string;
  isFlex?: boolean;
  error?: string;
  typeTitle?: 'base' | 'center-mix' | 'other';
  showIconLeft?: any;
  widthLeftIcon?: number;
  heightLeftIcon?: number;
  fillColorIcon?: string;
  disabled?: boolean;
}

export interface UserInfo {
  country: any;
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
  lifestyle: Array<string>;
  name: string;
  nationality: string;
  occupation: string;
  password: string;
  rental_account: string;
  updatedAt: string;
  preferences: Array<string>;
  isContactVerified?: boolean;
}

export interface ListRooms {
  LeasePeriod: any;
  PicturesVideo: Array<string>;
  PlaceType: string;
  PriceFlexibility: string;
  RentalAddress: string;
  RentalPrice: any;
  RoomDetails: any;
  createdAt: string;
  id: number;
  isActive: boolean;
  updatedAt: string;
  userId: number;
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
  customStyleLabel?: TextStyle;
  customePlaceholder?: JSX.Element;
  customStyleInputPicker?: TextStyle;
  customSubview?: JSX.Element;
}

export interface ListingRoomProps {
  id: number;
  type: string;
  title: string;
  image: any;
  location: string;
  active: boolean;
}

export interface ProfileLifeStyleProps {
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

export interface AppModalCountryProps {
  label?: string;
  onValueChange: (value: string, name?: string) => void;
  items?: any;
  style?: any;
  placeholder?: any;
  value?: any;
  error?: string;
  styleError?: any;
  name?: string;
  customStyleTitle?: ViewStyle;
  customStyleButton?: ViewStyle | ViewStyle[];
  customStyleContainer?: ViewStyle | ViewStyle[];
  type?: 'phone_code' | 'country';
  typeButton?: 'linear' | 'base';
}
