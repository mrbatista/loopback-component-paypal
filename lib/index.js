import assert from 'assert'
import * as PayPalConnector from './paypal-connector'

export default function(app, options) {

  assert(typeof options === 'object', 'cannot initialize paypal component without a options object');

  let loopback = app.loopback;
  let ds = loopback.createDataSource(Object.assign(options, {connector: PayPalConnector}));
  app.model('PayPal', {dataSource: ds, public: false});
}
