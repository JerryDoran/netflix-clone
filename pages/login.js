import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { useSignup } from '../hooks/useSignup';

export default function Login() {
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isPending } = useLogin();
  const { signUp, signupPending } = useSignup();

  const onSubmit = async (data) => {
    const { email, password } = data;
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  if (isPending || signupPending) {
    return <p>Loading</p>;
  }
  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image
        src='https://rb.gy/p2hphi'
        alt='login banner'
        layout='fill'
        className='-z-10 !hidden opacity-60 sm:!inline'
        objectFit='cover'
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='https://rb.gy/ulxxee'
        alt='logo'
        width={150}
        height={150}
        className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
      />

      <form
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-4xl font-semibold'>Sign In</h1>
        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='Email'
              className='input'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className='p-1 text-[13px] font-light text-orange-500'>
                Please enter a valid email!
              </span>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              type='password'
              placeholder='Password'
              className='input'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='p-1 text-[13px] font-light text-orange-500'>
                Password must contain between 6 and 60 characters!
              </span>
            )}
          </label>
        </div>
        <button
          className='w-full rounded bg-[#e50914] py-3 font-semibold'
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className='text-[gray]'>
          New to Netflix?
          <button
            type='submit'
            className='text-white hover:underline ml-2'
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}
