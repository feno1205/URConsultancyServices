import {
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";

const AuthContext =
  createContext(null);

const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
};

const getStoredUser = () => {
  try {
    const user =
      localStorage.getItem(
        STORAGE_KEYS.USER
      );

    return user
      ? JSON.parse(user)
      : null;
  } catch {
    return null;
  }
};

export function AuthProvider({
  children,
}) {
  const [token, setToken] =
    useState(() =>
      localStorage.getItem(
        STORAGE_KEYS.TOKEN
      )
    );

  const [user, setUser] =
    useState(getStoredUser);

  const [loading] =
    useState(false);

  const login = ({
    token,
    user,
  }) => {
    localStorage.setItem(
      STORAGE_KEYS.TOKEN,
      token
    );

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(user)
    );

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(
      STORAGE_KEYS.TOKEN
    );

    localStorage.removeItem(
      STORAGE_KEYS.USER
    );

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      setUser,
      isAuthenticated:
        Boolean(token),
    }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}