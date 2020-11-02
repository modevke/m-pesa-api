export interface User{
    id: string;
}

export interface LipaNaMpesaOnline{
    phone: string;
    amount: number;
    currency: string;
    user: User;
}

export interface C2bSimulate{
    amount: number;
    phone: string;
    reference: string;
}

export interface B2b{
    amount: number;
    currency: string;
    business: string;
}

export interface TransactionStatus{
    tras_ref: string;
    type: string;
}

export interface Reversal{
    tras_ref: string;
    type: string;
    amount: number;
    telephone: string;
    reason: string;
}


export interface configAttributes{
    c2b: {
        token: string,
        consumer_key: string;
        consumer_secret: string;
        shortcode: string;
        security_credential: string;
        initiator_name: string;
        validation_url: string;
        confirmation_url: string;
        response_type: string;
        stk: {
            shortcode: string;
            passkey: string;
            callback: string;
        }
    }
    b2c: {
        token: string,
        consumer_key: string;
        consumer_secret: string;
        initiator_name: string;
        security_credential: string;
        command_id: string;
        shortcode: string;
        timeout: string;
        callback: string;
    }
    b2b: {
        callback: string;
        timeout: string;
    }
    balance: {
        callback: string;
        timeout: string;
    }
    reversal: {
        callback: string;
        timeout: string;
    }
}