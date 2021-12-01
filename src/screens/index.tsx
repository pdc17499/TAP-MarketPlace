//UnAuthenticate
import { ChooseRole } from './auth/ChooseRole';
import { Welcome } from './auth/Welcome';
import { SignIn } from './auth/SignIn';
import { ResetPassword } from './auth/ResetPassword';
import { SignUp } from './auth/SignUp';
import { SignUpEmail } from './auth/SignUpEmail';
import { UserInformationName } from './auth/UserInformationName';
import { VerifyAccount } from './auth/VerifyAccount';
import { VerifyCode } from './auth/VerifyCode';
import { UserInformationGender } from './auth/UserInformationGender';
import { LifeStyle } from './auth/LifeStyle';
import { Preferences } from './auth/Preferences';
import { UpdateNewPassword } from './auth/UpdateNewPassword';
import {
  RoomUnitGallery,
  RoomUnitAddress,
  RoomUnitKindPlace,
  RoomUnitPlaceOffer,
  RoomUnitPrice,
  RoomUnitTypeRoom,
  ListLocations,
} from './auth/RoomUnit';

// Sign up Agent
import {
  IntroduceHomeowner,
  AgencyInformationName,
  AgencyBasicInformation,
} from './auth/UserInformation';

// Room
import {
  YourListing,
  RoomDetail,
  RoomDetailLocation,
  AddSuccess,
  RoomDetailGallery,
} from './homeowner/Room';

//HomeOwner - Tabbar
import { Matches } from './homeowner/Matches';
import { Liked } from './homeowner/Liked';
import { Chat } from './homeowner/Chat';

// Tenant
import { MatchesTenant } from './tenant/Matches';

//Agent


//Profile
import {
  Profile,
  BasicInfomation,
  ChangePassword,
  ProfileLifeStyle,
  AccountSetting,
  SearchingFilter,
  AgentInformation,
} from './profile';

export {
  ChooseRole,
  RoomUnitGallery,
  RoomUnitAddress,
  RoomUnitKindPlace,
  RoomUnitPlaceOffer,
  RoomUnitPrice,
  RoomUnitTypeRoom,
  ListLocations,
  Welcome,
  SignIn,
  ResetPassword,
  SignUp,
  SignUpEmail,
  UserInformationName,
  VerifyAccount,
  VerifyCode,
  UserInformationGender,
  LifeStyle,
  Preferences,
  AgencyInformationName,
  AgencyBasicInformation,
  // Authenticate
  Matches,
  Liked,
  Chat,
  UpdateNewPassword,
  Profile,
  BasicInfomation,
  ChangePassword,
  ProfileLifeStyle,
  AccountSetting,
  SearchingFilter,
  // Room
  YourListing,
  RoomDetail,
  RoomDetailLocation,
  AddSuccess,
  RoomDetailGallery,
  //Tenant
  MatchesTenant,
  //Agent
  AgentInformation,
  IntroduceHomeowner,

};
