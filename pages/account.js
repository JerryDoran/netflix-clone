import Head from 'next/head';
import Link from 'next/link';
import { useSubscription } from '../hooks/useSubscription';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { getProducts } from '@stripe/firestore-stripe-payments';
import payments from '../lib/stripe';
import Membership from '../components/Membership';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Account({ products }) {
  const { user } = useAuthContext();
  const subscription = useSubscription(user);
  const { logout } = useLogout();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!subscription) {
    return null;
  }

  const formattedDate = new Date(subscription?.created).toLocaleDateString(
    'en-us',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );
  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='bg-[#141414]'>
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

      <main className='pt-24 px-5 pb-12 transition-all mx-auto max-w-6xl md:px-10'>
        <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
          <h1 className='text-3xl md:text-4xl'>Account</h1>
          <div className='-ml-.5 flex items-center gap-x-1.5'>
            <img
              src='https://rb.gy/4vfk4r'
              alt='logo'
              className='w-7 h-7 cursor-pointer'
            />
            <p className='text-xs font-semibold text-[#555]'>
              Member since {formattedDate}
            </p>
          </div>
        </div>

        <Membership />

        <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0'>
          <h4>Plan Details</h4>
          <div className='col-span-2 font-medium'>
            {
              products?.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className='cursor-pointer text-sm text-blue-500 hover:underline md:text-right'>
            Change Plan
          </p>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0'>
          <h4 className='text-lg text-[gray]'>Settings</h4>
          <p
            className='col-span-3 cursor-pointer text-blue-500 hover:underline'
            onClick={logout}
          >
            Sign out of all devices
          </p>
          <p></p>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const products = await getProducts(payments, {
    includedPrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products: products,
    },
  };
};
