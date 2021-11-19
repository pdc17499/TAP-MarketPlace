import {
  IconAirConditioning,
  IconBalcony,
  IconBathTub,
  IconBBQPit,
  IconDedicatedWorkspace,
  IconGym,
  IconKitchen,
  IconParkingLot,
  IconPool,
  IconTV,
  IconWashingMachine,
  IconWifi,
} from '../assets';
import React from 'react';

export const ROOM_UNIT_HOWNER = {
  kind_place: [
    {
      label: 'Condo',
      value: 'Condo',
    },
    {
      label: 'HDB',
      value: 'HDB',
    },
    {
      label: 'Landed',
      value: 'Landed',
    },
    {
      label: 'Shophouse',
      value: 'Shophouse',
    },
  ],
  rental_price: [
    {
      label: 'Negotiable',
      value: 'Negotiable',
    },
    {
      label: 'Fixed price',
      value: 'Fixed price',
    },
    {
      label: 'Price range',
      value: 'Price range',
    },
  ],
  lease_your_place: [
    {
      label: '3 months',
      value: '3 months',
    },
    {
      label: '9 months',
      value: '9 months',
    },
    {
      label: '12 months',
      value: '12 months',
    },
    {
      label: '36 months',
      value: '36 months',
    },
  ],
  lease_your_place_hdb: [
    {
      label: '6 months',
      value: '6 months',
    },
    {
      label: '9 months',
      value: '9 months',
    },
    {
      label: '12 months',
      value: '12 months',
    },
    {
      label: '36 months',
      value: '36 months',
    },
  ],
  staying_width_guests: [
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
  ],
  room_type: [
    {
      label: 'Entire Home',
      value: 'Entire Home',
    },
    {
      label: 'Room',
      value: 'Room',
    },
  ],
  bedroom_number: [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5+',
      value: '5+',
    },
  ],
  bathroom_number: [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5+',
      value: '5+',
    },
  ],
  attached_bathroom: [
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
  ],
  room_furnishing: [
    {
      label: 'Unfurnished',
      value: 'Unfurnished',
    },
    {
      label: 'Partially Furnished',
      value: 'Partially Furnished',
    },
    {
      label: 'Fully Furnished',
      value: 'Fully Furnished',
    },
  ],
  floor_level: [
    {
      label: 'Ground',
      value: 'Ground',
    },
    {
      label: 'Low',
      value: 'Low',
    },
    {
      label: 'Mid',
      value: 'Mid',
    },
    {
      label: 'High',
      value: 'High',
    },
    {
      label: 'Penhouse',
      value: 'Penhouse',
    },
  ],
  allow_cooking: [
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
  ],
  amenities: [
    {
      label: 'Wifi',
      value: 'Wifi',
      icon: <IconWifi />,
    },
    {
      label: 'Air Conditioning',
      value: 'Air Conditioning',
      icon: <IconAirConditioning />,
    },
    {
      label: 'TV',
      value: 'TV',
      icon: <IconTV />,
    },
    {
      label: 'Dedicated workspace',
      value: 'Dedicated workspace',
      icon: <IconDedicatedWorkspace />,
    },
    {
      label: 'Kitchen',
      value: 'Kitchen',
      icon: <IconKitchen />,
    },
    {
      label: 'Bath tub',
      value: 'Bath tub',
      icon: <IconBathTub />,
    },
    {
      label: 'Washing machine',
      value: 'Washing machine',
      icon: <IconWashingMachine />,
    },
    {
      label: 'Balcony',
      value: 'Balcony',
      icon: <IconBalcony />,
    },
    {
      label: 'Pool',
      value: 'Pool',
      icon: <IconPool />,
    },
    {
      label: 'Gym',
      value: 'Gym',
      icon: <IconGym />,
    },
    {
      label: 'BBQ pit',
      value: 'BBQ pit',
      icon: <IconBBQPit />,
    },
    {
      label: 'Parking lot',
      value: 'Parking lot',
      icon: <IconParkingLot />,
    },
  ],
  gender: [
    {
      value: 'male',
      label: 'male',
    },
    {
      value: 'female',
      label: 'female',
    },
    {
      value: 'other',
      label: 'other',
    },
  ],
  group_age: [
    {
      value: 1,
      label: '18 - 28',
    },
    {
      value: 2,
      label: '29 - 40',
    },
    {
      value: 3,
      label: '41 - 55',
    },
    {
      value: 4,
      label: 'Over 55',
    },
  ],
  your_place: [
    {
      label: 'LGBT friendly',
      value: 'LGBT friendly',
    },
    {
      label: 'Diversity friendly',
      value: 'Diversity friendly',
    },
  ],
  have_pets: [
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
    {
      label: 'May have',
      value: 'May have',
    },
  ],
  smoking: [
    {
      label: 'Non-smoker',
      value: 'Non-smoker',
    },
    {
      label: 'Social',
      value: 'Social',
    },
    {
      label: 'Heavy',
      value: 'Heavy',
    },
  ],
  diet_choices: [
    {
      label: 'Gluten free',
      value: 'Gluten free',
    },
    {
      label: 'Halal',
      value: 'Halal',
    },
    {
      label: 'Lactose free',
      value: 'Lactose free',
    },
    {
      label: 'Nuts free',
      value: 'Nuts free',
    },
    {
      label: 'Vegeterian',
      value: 'Vegeterian',
    },
  ],
  occupation: [
    {
      value: 'Teacher',
      label: 'Teacher',
    },
    {
      value: 'Doctor',
      label: 'Doctor',
    },
    {
      value: 'Programer',
      label: 'Programer',
    },
    {
      value: 'Student',
      label: 'Student',
    },
    {
      value: 'Shipper',
      label: 'Shipper',
    },
    {
      value: 'Singer',
      label: 'Singer',
    },
    {
      value: 'Model',
      label: 'Model',
    },
    {
      value: 'Lawyer',
      label: 'Lawyer',
    },
  ],
  ethnicity: [
    {
      value: 'Shang',
      label: 'Shang',
    },
    {
      value: 'Asia',
      label: 'Asia',
    },
    {
      value: 'Africa',
      label: 'Africa',
    },
    {
      value: 'Europe',
      label: 'Europe',
    },
    {
      value: 'China',
      label: 'China',
    },
    {
      value: 'North America',
      label: 'North America',
    },
    {
      value: 'South America',
      label: 'South America',
    },
    {
      value: 'Oceania',
      label: 'Oceania',
    },
    {
      value: 'Antarctica',
      label: 'Antarctica',
    },
  ],
  religions: [
    {
      value: 'Christianity',
      label: 'Christianity',
    },
    {
      value: 'Islam',
      label: 'Islam',
    },
    {
      value: 'Secular/Nonreligious/Atheist',
      label: 'Secular/Nonreligious/Atheist',
    },
    {
      value: 'Buddhism',
      label: 'Buddhism',
    },
    {
      value: 'Chinese traditional religion',
      label: 'Chinese traditional religion',
    },
    {
      value: 'Ethnic religions',
      label: 'Ethnic religions',
    },
    {
      value: 'African traditional religions',
      label: 'African traditional religions',
    },
    {
      value: 'Sikhism',
      label: 'Sikhism',
    },
    {
      value: 'Spiritism',
      label: 'Spiritism',
    },
    {
      value: 'Judaism',
      label: 'Judaism',
    },
    {
      value: 'Baháʼí',
      label: 'Baháʼí',
    },
  ],
};
