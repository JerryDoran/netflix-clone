import Head from 'next/head';
import Link from 'next/link';
import { useSubscription } from '../hooks/useSubscription';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Account() {
  const { user } = useAuthContext();
  const subscription = useSubscription(user);
  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='bg-[#141414'>
        <Link href='/'>
          <img
            src='https://rb.gy/ulxxee'
            alt='logo'
            width={120}
            height={120}
            className='cursor-pointer object-contain'
          />
        </Link>
        <Link href='/account'>
          <img
            src='https://rb.gy/g1pwyx'
            alt=''
            className='cursor-pointer rounded'
          />
        </Link>
      </header>
      <main className='pt-24'>
        <div>
          <h1 className='text-3xl md:text-4xl'>Account</h1>
          <div>
            <img src='' alt='' />
            <p>Member since {subscription?.created}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
