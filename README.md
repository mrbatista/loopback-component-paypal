# loopback-component-paypal 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
>

## Installation

```sh
$ npm install --save loopback-component-paypal
```

## Usage
Add configuration in file component-config.json
```js
{
  "loopback-component-paypal": {
    "clientID": "CLIENT_ID",
    "clientSecret": "CLIENT_SECRET",
    "mode": "sandbox",
    "payment": {
      "intent": "sale",
      "redirect_urls": {
        "return_url": "return_url",
        "cancel_url": "cancel_url"
      },
      "payer": {
        "payment_method": "paypal"
      }
    }
  }
}

var PayPal = app.models.PayPal;
PayPal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});
```
## License

MIT © [Matteo Padovano](https://github.com/mrbatista)


[npm-image]: https://badge.fury.io/js/loopback-component-paypal.svg
[npm-url]: https://npmjs.org/package/loopback-component-paypal
[travis-image]: https://travis-ci.org/mrbatista/loopback-component-paypal.svg?branch=master
[travis-url]: https://travis-ci.org/mrbatista/loopback-component-paypal
[daviddm-image]: https://david-dm.org/mrbatista/loopback-component-paypal.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mrbatista/loopback-component-paypal
