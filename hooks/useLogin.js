import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../firebase.config';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signIn = async (email, password) => {
    setError(null);
    setIsPending(true);

    // log user in
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);

      dispatch({ type: 'LOGIN', payload: user });

      // update state

      setIsPending(false);
      setError(null);
      router.push('/');
    } catch (error) {
      alert(error.message);
      setError('Oops...something went wrong!');
      setIsPending(false);
    }
  };

  useEffect(() => {
    // cleanup
    return () => {
      setIsCanceled(true);
    };
  }, []);

  return { signIn, error, isPending };
};
