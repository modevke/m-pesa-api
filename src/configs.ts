const url = '';

export const configs = {
    c2b: {
        token: '',
        consumer_key: '',
        consumer_secret: '',
        shortcode: '',
        security_credential: '',
        initiator_name: '',
        validation_url: `${url}/c2b-validation`,
        confirmation_url: `${url}/c2b-confirmation`,
        response_type: '',
        stk: {
            shortcode: '',
            passkey: '',
            callback: `${url}/stk-callback`
        }
    },
    b2c: {
        token: '',
        consumer_key: '',
        consumer_secret: '',
        initiator_name: '',
        security_credential: '',
        command_id: '',
        shortcode: '',
        timeout: `${url}/b2c-timeout`,
        callback: `${url}/b2c-callback`
    },
    b2b: {
        callback: `${url}/b2b-callback`,
        timeout: `${url}/b2b-timeout`,
    },
    balance: {
        callback: `${url}/balance-callback`,
        timeout: `${url}/balance-timeout`,
    },
    transaction: {
        callback: `${url}/transaction-callback`,
        timeout: `${url}/transaction-timeout`,
    },
    reversal: {
        callback: `${url}/reversal-callback`,
        timeout: `${url}/reversal-timeout`,
    },
    max_amount: 70000,
    min_amount: 10,
    error_codes: [
        { code: 1032, message: 'Cancelled by user' },
        { code: 1037, message: 'STK timed out' },
    ]
}