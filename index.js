import { cache } from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';

function baseParser(value) {
  return value === 'undefined' ? undefined : JSON.parse(value);
}

export async function syncWithAsyncStorage(parser = baseParser) {
  let storageData = [];
  try {
    const keys = await AsyncStorage.getAllKeys();
    storageData = await AsyncStorage.multiGet(keys);
  } catch (e) {
    return [false, null];
  }

  for (let [key, data] of storageData) {
    if (!key.startsWith('swr-')) {
      continue;
    }

    cache.set(key.slice(4), parser(data).swrValue, false);
  }

  const subscription = cache.subscribe(() => {
    const keys = cache.keys();
    for (let key of keys) {
      // TODO deal with error
      AsyncStorage.setItem(
        `swr-${key}`,
        JSON.stringify({ swrValue: cache.get(key) })
      ).catch();
    }
  });

  return [true, subscription];
}
