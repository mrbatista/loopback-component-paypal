import expect from './expect';
import * as dataSource from './init';

describe('loopback-component-paypal', function() {
  this.timeout(15000);

  let ds, PayPal;
  const paymentTransaction = {
    'intent': 'sale',
    'payer': {
      'payment_method': 'paypal',
    },
    'redirect_urls': {
      'return_url': 'http://return.url',
      'cancel_url': 'http://cancel.url',
    },
    'transactions': [{
      'item_list': {
        'items': [{
          'name': 'item',
          'sku': 'item',
          'price': '1.00',
          'currency': 'USD',
          'quantity': 1,
        }],
      },
      'amount': {
        'currency': 'USD',
        'total': '1.00',
      },
      'description': 'This is the payment description.',
    }],
  };

  it('PayPal connector expose payment property', (done) => {
    ds = dataSource.getDataSource();
    PayPal = ds.define('PayPal');
    expect(PayPal.payment).to.exist();
    done();
  });

  it('create payment request with invalid credential should report error',
    (done) => {
      ds = dataSource.getDataSource({});
      PayPal = ds.define('PayPal');
      PayPal.payment.create({}, (err) => {
        expect(err).to.exist();
        const response = err.response;
        expect(response.error).to.be.equal('invalid_client');
        expect(response.httpStatusCode).to.be.equal(401);
        done();
      });
    });

  it('create payment request', (done) => {
    ds = dataSource.getDataSource();
    PayPal = ds.define('PayPal');
    PayPal.payment.create(paymentTransaction, (err, response) => {
      expect(err).to.not.exist();
      expect(response.id).to.exist();
      expect(response.intent).to.be.equal('sale');
      expect(response.state).to.be.equal('created');
      expect(response.payer).to.be.eql({payment_method: 'paypal'}); // eslint-disable-line camelcase
      expect(response.transactions.length).to.be.equal(1);
      expect(response.links.length).to.be.equal(3);
      expect(response.httpStatusCode).to.be.equal(201);
      done();
    });
  });
});
