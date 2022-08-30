import payments from '../lib/stripe';

import { useState, useEffect } from 'react';

import { onCurrentUserSubscriptionUpdate } from '@stripe/firestore-stripe-payments';

export const useSubscription = (user) => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === 'active' ||
            subscription.status === 'trialing'
        )[0]
      );
      // console.log(subscription);
    });
  }, [user]);

  return subscription;
};
