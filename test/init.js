import * as juggler from 'loopback-datasource-juggler';
import rc from 'rc';

import * as PayPalConnector from './../lib/paypal-connector';

const TEST_ENV = process.env.TEST_ENV || 'test';
let config = rc('loopback', {test: {paypal: {}}})[TEST_ENV].paypal;

if (process.env.CI) {
  config = {
    clientID: process.env.PAYPAL_CLIENTID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    mode: 'sandbox',
  };
}

export function getDataSource(customConfig) {
  return new juggler.DataSource(PayPalConnector, customConfig || config);
}
