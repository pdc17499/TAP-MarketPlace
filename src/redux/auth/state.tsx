import {DataSignupProps, Token, UserInfo} from '@interfaces';
import moment from 'moment';

export type AuthState = {
  loading: boolean;
  user: any;
  token: any;
  role: any;
  showIntroScreen: boolean;
  typeUser: 'Homeowner' | 'Tenant' | 'Agent';
  dataSignup: DataSignupProps | {};
  listRooms: any;
};

export const INITIAL_STATE_DATA_SIGN_UP: DataSignupProps = {
  location: {
    lat: -1,
    long: -1,
    title: '',
  },
  kind_place: {},
  kind_place_tenant: [],
  rental_price: {},
  negotiable_price: '',
  fixed_price: '',
  min_range_price: 4000,
  max_range_price: 25000,
  lease_your_place: [],
  staying_with_guests: {},
  room_type: {},
  bedroom_number: {},
  bathroom_number: {},
  floor_size_min: 500,
  floor_size_max: 10000,
  attached_bathroom: {},
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
  country: 'Singapore',
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
  avatar: '',
  phone: '',
  life_style: [],
  preferences: [],
  agency_name: '',
  license_no: '',
  sale_person_no: '',
  homeowner_name: '',
  homeowner_gender: {},
  bedroom_number_tenant: [],
  bathroom_number_tenant: [],
};

export const INITIAL_STATE_AUTH: AuthState = {
  loading: false,
  user: null,
  token: null,
  role: null,
  showIntroScreen: true,
  typeUser: 'Homeowner',
  dataSignup: INITIAL_STATE_DATA_SIGN_UP,
  listRooms: null,
};
