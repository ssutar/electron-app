import { ILoginFormData, ISignupFormData, ITeacher } from '@interfaces/models';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export interface IAuthContext {
  // authUserId: string | null;
  isAuthenticated: boolean;
  authUser: ITeacher | null;

  signup: (p: ISignupFormData) => void;
  login: (p: ILoginFormData) => Promise<void>;
  logout: () => void;
}

// const defaultContext = {
//   // authUserId: null,
//   isAuthenticated: false,
//   signup: (_p: ISignupFormData) => {},
//   login: (_p: ILoginFormData) => Promise.resolve(),
//   logout: () => {}
// };

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const authValue = JSON.parse(window.localStorage.getItem('auth') || '{}');

      if (authValue && authValue.id) {
        setIsAuthenticated(true);
        setAuthUser(authValue);
      }
    } catch (e) {}
  }, []);

  // useEffect(() => {
  //   setIsAuthenticated(authUserId === null ? false : true);
  // }, [authUserId]);

  const signup = (data: ISignupFormData) => {
    window.api.signup(data).then(() => {
      navigate('/status', { state: { message: t('signupForm.success') } });
    });
  };

  const login = async (data: ILoginFormData) => {
    const teacherData = await window.api.login(data);
    window.localStorage.setItem('auth', JSON.stringify(teacherData));
    setIsAuthenticated(true);
    setAuthUser(teacherData);
    navigate('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    window.localStorage.removeItem('auth');
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      authUser,
      signup,
      login,
      logout
    }),
    [isAuthenticated, authUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as IAuthContext;
};
