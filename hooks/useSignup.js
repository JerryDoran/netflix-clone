import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { useRouter } from 'next/router';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [signupPending, setSignupPending] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const router = useRouter();

  const signUp = async (email, password) => {
    setError(null);
    setSignupPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // add display name to user
      // await res.user.updateProfile({ displayName: displayName });

      // update state

      setSignupPending(false);
      setError(null);
      router.push('/');
    } catch (error) {
      alert(error.message);
      setError('Oops...something went wrong!');
      setSignupPending(false);
    }
  };

  useEffect(() => {
    // cleanup
    return () => {
      setIsCanceled(true);
    };
  }, []);

  return {
    error,
    signupPending,
    signUp,
  };
};
