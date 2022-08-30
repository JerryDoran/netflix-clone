import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSubscription } from '../hooks/useSubscription';
import Loader from './Loader';
import { goToBillingPortal } from '../lib/stripe';

export default function Membership() {
  const { user } = useAuthContext();
  const subscription = useSubscription(user);
  const [isBillingLoading, setIsBillingLoaded] = useState(false);

  const manageSubscription = () => {
    if (subscription) {
      setIsBillingLoaded(true);
      goToBillingPortal();
    }
  };

  return (
    <div className='grid grid-cols-1 mt-6 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0'>
      <div className='space-y-4 py-4'>
        <h4 className='text-lg text-[gray]'>Membership & Billing</h4>
        <button
          disabled={isBillingLoading || !subscription}
          className='h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5'
          onClick={manageSubscription}
        >
          {isBillingLoading ? (
            <Loader color='dark:fill-[#e50914]' />
          ) : (
            'Cancel Membership'
          )}
        </button>
      </div>
      <div className='col-span-3'>
        <div className='flex flex-col justify-between border-b border-white/10 py-4 md:flex-row'>
          <div>
            <p className='font-medium text-sm'>{user?.email}</p>
            <p className='text-[gray] text-sm'>Password: ********</p>
          </div>
          <div className='md:text-right'>
            <p className='membershipLink'>Change email</p>
            <p className='membershipLink'>Change Password</p>
          </div>
        </div>
        <div className='flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0'>
          <div>
            <p>
              {subscription?.cancel_at_period_end
                ? 'Your membership will end on '
                : 'Your next billing date is '}
              {subscription?.current_period_end}
            </p>
          </div>
          <div className='md:text-right'>
            <p className='membershipLink'>Manage payment information</p>
            <p className='membershipLink'>Add backup payment method</p>
            <p className='membershipLink'>Billing details</p>
            <p className='membershipLink'>Change billing date</p>
          </div>
        </div>
      </div>
    </div>
  );
}
