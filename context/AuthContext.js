import { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

const initialState = {
  user: null,
  authIsReady: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_READY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_READY', payload: user });
      // if (!user) {
      //   router.push('/login');
      // }
      unsub();
    });
  }, []);

  console.log('AuthContext state:', state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
