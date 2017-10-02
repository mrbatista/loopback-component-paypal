import {PayPalService} from './paypal-service';

/**
 * Initialize the paypal service as a connector for LoopBack data sources
 * @param {dataSource} dataSource DataSource instance
 * @prop {Object} settings Connector settings
 */
export function initialize(dataSource) {
  const settings = dataSource.settings || {};
  const connector = new PayPalService(settings);
  dataSource.connector = connector;
  dataSource.connector.dataSource = dataSource;

  connector.DataAccessObject = DataAccessObject;

  function DataAccessObject() {
  }

  DataAccessObject.payment = connector.client.payment;
  DataAccessObject.sale = connector.client.sale;
  DataAccessObject.refund = connector.client.refund;
  DataAccessObject.authorization = connector.client.authorization;
  DataAccessObject.capture = connector.client.capture;
  DataAccessObject.order = connector.client.order;
  DataAccessObject.payout = connector.client.payout;
  DataAccessObject.payoutItem = connector.client.payoutItem;
  DataAccessObject.billingPlan = connector.client.billingPlan;
  DataAccessObject.billingAgreement = connector.client.billingAgreement;
  DataAccessObject.creditCard = connector.client.creditCard;
  DataAccessObject.invoice = connector.client.invoice;
  DataAccessObject.openIdConnect = connector.client.openIdConnect;
  DataAccessObject.webProfile = connector.client.webProfile;
  DataAccessObject.notification = connector.client.notification;
  /* eslint-disable camelcase */
  DataAccessObject.generate_token = connector.client.generate_token;
  DataAccessObject.billing_plan = connector.client.billing_plan;
}
