import * as chai from 'chai';
import dirtyChai from 'dirty-chai'
import loopback from 'loopback';
import loopbackComponentPaypal from '../lib';
let expect = chai.expect;
chai.use(dirtyChai);

describe('loopback-component-paypal', () => {
  let app;
  before((done) => {
    app = loopback();
    loopbackComponentPaypal(app, {});
    done();
  });

  it('PayPal connector should have property payment', (done) => {
    expect(app.models.PayPal.payment).to.exist();
    done();
  });
});
