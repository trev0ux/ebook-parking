import { loadStripe } from '@stripe/stripe-js';

export default async (context, inject) => {
  const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
  inject('stripe', stripe);
};
