import paypal from 'paypal-rest-sdk';

export class PayPalService {

  constructor(options) {

    paypal.configure({
      client_id: options.clientID,
      client_secret: options.clientSecret,
      mode: options.mode || 'sandbox'
    });
    this.client = paypal;
  }

}
