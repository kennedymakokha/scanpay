import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ACCOUNTS_KEY = 'USER_ACCOUNTS';
const ACTIVE_USER_KEY = 'ACTIVE_USER';

export const getUserAccounts = async () => {
  const accounts = await AsyncStorage.getItem(USER_ACCOUNTS_KEY);
  return accounts ? JSON.parse(accounts) : [];
};

export const addUserAccount = async (user: { id: string; name: string; token: string }) => {
  const existing = await getUserAccounts();
  const updated = [...existing.filter((u: any) => u.id !== user.id), user];
  await AsyncStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(updated));
};

export const removeUserAccount = async (userId: string) => {
  const existing = await getUserAccounts();
  const updated = existing.filter((u: any) => u.id !== userId);
  await AsyncStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(updated));
};

export const setActiveUser = async (userId: string) => {
  await AsyncStorage.setItem(ACTIVE_USER_KEY, userId);
};

export const getActiveUser = async () => {
  const userId = await AsyncStorage.getItem(ACTIVE_USER_KEY);
  const accounts = await getUserAccounts();
  return accounts.find((u: any) => u.id === userId);
};
