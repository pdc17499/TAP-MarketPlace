import {getUserLocation} from '@util';
import axios from 'axios';

export async function getListLocation(text: string = '') {
  try {
    const searchURL =
      'https://maps.googleapis.com/maps/api/place/textsearch/json?';
    const API_KEY = 'AIzaSyDs_vnhA0i_hYvKfCHdbYO5S5aOkBNt4PE';
    const URL = `${searchURL}query=${text}&key=${API_KEY}`;
    return await axios.get(URL, {});
  } catch (err) {
    console.log(err);
  }
}

export async function getListLocationAroundYou(text: string = '') {
  try {
    const location: any = await getUserLocation();
    const searchURL =
      'https://maps.googleapis.com/maps/api/place/textsearch/json?';
    const API_KEY = 'AIzaSyDs_vnhA0i_hYvKfCHdbYO5S5aOkBNt4PE';
    const RADIUS = '10000';
    const URL = `${searchURL}query=${text}&location=${location.lathigitude},${location.longitude}&radius=${RADIUS}&key=${API_KEY}`;
    console.log(URL);
    return await axios.get(URL, {});
  } catch (err) {
    console.log(err);
  }
}

export async function getPlaceLocation() {
  try {
    const location: any = await getUserLocation();
    const text = `${location?.latitude},${location?.longitude}`;
    console.log(text);
    const searchURL =
      'https://maps.googleapis.com/maps/api/place/textsearch/json?';
    const API_KEY = 'AIzaSyDs_vnhA0i_hYvKfCHdbYO5S5aOkBNt4PE';
    const RADIUS = '10000';
    const URL = `${searchURL}query=${text}&location=${location.latitude},${location.longitude}&radius=${RADIUS}&key=${API_KEY}`;
    console.log(URL);
    return await axios.get(URL, {});
  } catch (err) {
    console.log(err);
  }
}
