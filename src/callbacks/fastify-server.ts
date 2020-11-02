import fastify from 'fastify';

const app = fastify({
    logger: true,
    pluginTimeout: 100000,
    trustProxy: true
});

app.post('/stk-callback', {}, (req, res) => {

    console.log('STK_CALLBACK___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});

app.post('/c2b-validation', {}, (req, res) => {

    console.log('C2B_VALIDATION___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});

app.post('/c2b-confirmation', {}, (req, res) => {

    console.log('C2B_CONFIRMATION___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});

app.post('/b2c-timeout', {}, (req, res) => {

    console.log('B2C_TIMEOUT___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});

app.post('/b2c-callback', {}, (req, res) => {

    console.log('B2C_RESPONSE___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});


app.post('/b2b-timeout', {}, (req, res) => {

    console.log('B2B_TIMEOUT___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});


app.post('/b2b-callback', {}, (req, res) => {

    console.log('B2B_RESPONSE___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});


app.post('/balance-timeout', {}, (req, res) => {

    console.log('BALANCE_TIMEOUT___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});


app.post('/balance-callback', {}, (req, res) => {

    console.log('BALANCE_RESPONSE___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});

app.post('/transaction-timeout', {}, (req, res) => {

    console.log('TRANSACTION_TIMEOUT___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});


app.post('/transaction-callback', {}, (req, res) => {

    console.log('TRANSACTION_RESPONSE___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});

app.post('/reversal-timeout', {}, (req, res) => {

    console.log('REVERSAL_TIMEOUT___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});


app.post('/reversal-callback', {}, (req, res) => {

    console.log('REVERSAL_RESPONSE___________________________');

    console.log(req.body);

    res.send({
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
    });

});

app.listen(3010, '0.0.0.0', function (err, address) {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening on port ${address}`);
});
  