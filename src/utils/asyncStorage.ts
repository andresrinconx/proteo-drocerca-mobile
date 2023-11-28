import AsyncStorage from '@react-native-async-storage/async-storage';

export const setDataStorage = async (key: string, value: string | boolean | object | number | any[] | null | undefined) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error storing value: ', error);
  }
};

export const getDataStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value as string);
  } catch (error) {
    console.log('Error retrieving value: ', error);
  }
};

export const removeDataStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing value: ', error);
  }
};