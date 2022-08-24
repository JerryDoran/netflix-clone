import { CheckIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import Link from 'next/link';
import Table from './Table';
import Loader from './Loader';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useState } from 'react';
import { loadCheckout } from '../lib/stripe';

export default function Plans({ products }) {
  const [selectedPlan, setSelectedPlan] = useState(products[2]);
  const [isBillingLoaded, setIsBillingLoaded] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  // console.log(selectedPlan);

  const subscribeToPlan = async () => {
    if (!user) return;

    await loadCheckout(selectedPlan?.prices[0].id);
    setIsBillingLoaded(true);
  };

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='border-b border-white/10 bg-[#`141414]'>
        <Link href='/'>
          <img
            src='https://rb.gy/ulxxee'
            alt='Netflix'
            width={150}
            height={90}
            className='cursor-pointer object-contain'
          />
        </Link>
        <button
          className='text-lg font-medium hover:underline'
          onClick={logout}
        >
          Sign Out
        </button>
      </header>
      <main className='pt-28 px-5 pb-12 mx-auto transition-all max-w-5xl md:px-10'>
        <h1 className='mb-3 text-3xl font-medium'>
          Choose the plan that&apos;s right for you
        </h1>
        <ul>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Watch all you want.
            Ad-free.
          </li>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Recommendations
            just for you.
          </li>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Change or cancel
            your plan anytime.
          </li>
        </ul>
        <div className='mt-4 flex flex-col space-y-4'>
          <div className='flex w-full items-center justify-center self-end md:w-3/5'>
            {products?.map((product) => (
              <div
                className={`planBox ${
                  selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          {/* <Table /> */}
          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isBillingLoaded}
            className={`mx-auto w-11/12 cursor-pointer rounded bg-[#e50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoaded && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoaded ? (
              <Loader color='dark:fill-gray-300' />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
