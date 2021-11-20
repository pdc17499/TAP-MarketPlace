import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('TOKEN', token);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('TOKEN');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const removeToken = async () => {
  console.log('removeToken');
  try {
    const value = await AsyncStorage.removeItem('TOKEN');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
