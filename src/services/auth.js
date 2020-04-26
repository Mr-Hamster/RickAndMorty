export const USER_KEY = 'auth-user';

export const onSignIn = data => localStorage.setItem(USER_KEY, JSON.stringify(data));

export const onSignOut = () => localStorage.removeItem(USER_KEY);

export const getToken = async () => {
  const authDataStr = await localStorage.getItem(USER_KEY);

  if (!authDataStr) {
    return null;
  }

  return JSON.parse(authDataStr).token;
};