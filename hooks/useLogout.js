import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase.config';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign user out
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });

      // update state
      setIsPending(false);
      setError(null);
      router.push('/login');
    } catch (error) {
      if (!isCanceled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    // cleanup
    return () => {
      setIsCanceled(true);
    };
  }, []);

  return { logout, error, isPending };
};
