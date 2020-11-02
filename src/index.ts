import { Mpesa } from './Mpesa';
import { configs } from './configs';

const environment = 'sandbox'
const mpesaObj = new Mpesa(configs, environment);


// 1) AUTHORIZE
// mpesaObj.oAuthorize(mpesaObj.config.b2c.consumer_key, mpesaObj.config.b2c.consumer_secret).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// 2) REGISTER URL
// mpesaObj.c2bRegister().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// 3 SIMULATE TRANSACTION ()NO RESPONSE
// mpesaObj.c2bSimulate({
//     amount: 148,
//     phone: '254708374149',
//     reference: 'inv006'
// }).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// 4 STK PUSH
// mpesaObj.lipaNaMpesaOnline({
//     phone: '254713730377',
//     amount: 10,
//     currency: 'KES',
//     user: { id: '1234' }
// })
// .then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// 5 B2C
// mpesaObj.b2c({
//       phone: '254708374149',
//       amount: 100,
//       user: { id: 'ID1233' },
//       currency: 'KES' 
// })
// .then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// 6 B2B
// mpesaObj.b2b({
//     amount: 2000,
//     currency: 'KES',
//     business: '600000',
// })
// .then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// 7. ACCOUNT BALANCE
// mpesaObj.accountBalance()
// .then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// 8. TRANSACTION STATUS
// mpesaObj.transactionStatus({
//     tras_ref: 'XJV9RQHSTZ',
//     type: 'c2b'
// })
// .then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });


// 8. REVERSAL
// mpesaObj.reversal({
//     tras_ref: 'XJV9RQHSTZ',
//     type: 'c2b',
//     amount: 20,
//     telephone: '254736636366',
//     reason: 'Bad money',
// })
// .then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });