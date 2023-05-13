import asyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  async get(key: string): Promise<any> {
    const itemData = await asyncStorage.getItem(key);
    return itemData ? JSON.parse(itemData) : itemData;
  }

  async set(key: string, value: any): Promise<void> {
    await asyncStorage.setItem(key, value);
  }
  async remove(key: string): Promise<void> {
    await asyncStorage.removeItem(key);
  }
  async clear(): Promise<void> {
    await asyncStorage.clear();
  }
}

export const storage = new Storage();

export const storageKeys = {
  theme: '@storage/theme',
};
