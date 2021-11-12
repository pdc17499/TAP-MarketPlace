import {DataSignupProps} from '@interfaces';
import moment from 'moment';

export type AuthState = {
  loading: boolean;
  user: any;
  showIntroScreen: boolean;
  typeUser: 'Homeowner' | 'Tenant' | 'Agent';
  dataSignup: DataSignupProps;
};

export const INITIAL_STATE_DATA_SIGN_UP: DataSignupProps = {
  location: {
    lat: -1,
    long: -1,
    title: '',
  },
  kind_place: {},
  rental_price: {},
  negotiable_price: '',
  fixed_price: '',
  min_range_price: 4000,
  max_range_price: 25000,
  lease_your_place: {},
  staying_with_guests: {},
  room_type: {},
  bedroom_number: {},
  bathroom_number: {},
  floor_size_min: 600,
  floor_size_max: 8000,
  attached_room: {},
  room_furnishing: {},
  floor_level: {},
  allow_cooking: {},
  built_year: moment().format('YYYY').toString(),
  key_your_place: [],
  role_user: '',
  list_photo: [],
  user_name: '',
  gender: {},
  age_group: {},
  country: {
    callingCode: ['65'],
    cca2: 'SG',
    currency: ['SGD'],
    flag: 'flag-sg',
    name: 'Singapore',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
  },
  occupation: {},
  ethnicity: {},
  your_place: [],
  have_pet: {},
  smoke: {},
  diet_choice: [],
  your_religion: {},
  email: '',
  password: '',
  confirm_password: '',
};

export const INITIAL_STATE_AUTH: AuthState = {
  loading: false,
  user: null,
  showIntroScreen: true,
  typeUser: 'Homeowner',
  dataSignup: INITIAL_STATE_DATA_SIGN_UP,
};
