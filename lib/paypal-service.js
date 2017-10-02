import paypal from 'paypal-rest-sdk';

export class PayPalService {
  constructor(options) {
    paypal.configure({
      /* eslint-disable camelcase */
      client_id: options.clientID,
      client_secret: options.clientSecret,
      /* eslint-enable camelcase */
      mode: options.mode || 'sandbox',
    });

    this.client = paypal;
  }
}
