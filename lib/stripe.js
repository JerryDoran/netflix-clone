import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments';
import { getFunctions, httpsCallable } from '@firebase/functions';
import app from '../firebase.config';

const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
});

// console.log(payments);

const loadCheckout = async (priceId) => {
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message));
};

const goToBillingPortal = async () => {
  const instance = await getFunctions(app, 'us-central1');
  const funcRef = httpsCallable(
    instance,
    'ext-firestore-stripe-payments-createPortalLink'
  );

  await funcRef({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }) => window.location.assign(data.url))
    .catch((error) => console.log(error.message));
};

export { loadCheckout, goToBillingPortal };
export default payments;
