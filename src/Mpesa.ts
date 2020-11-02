import { LipaNaMpesaOnline, C2bSimulate, B2b, Reversal, TransactionStatus, configAttributes } from './interfaces';
import reqmaker from './reqmaker'; 
import moment from 'moment-timezone';
import crypto from 'crypto';
import constants from 'constants';
import path from 'path';
import fs from 'fs';

export class Mpesa {
    
    public api_status: string;
    public config: configAttributes;

    constructor(cfig: configAttributes, apiStatus: string){
        this.config = cfig;
        this.api_status = apiStatus;
    }
    
    async accountBalance(){
        const req = {
            oauth_token: "Bearer " + await this.oAuth('b2c'),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/accountbalance/v1/query`,
            Initiator: this.config.b2c.initiator_name,
            SecurityCredential: this.config.b2c.security_credential || this.generateSecurityCredential(this.config.b2c.security_credential),
            CommandID: 'AccountBalance',
            PartyA: this.config.b2c.shortcode,
            IdentifierType: '4',
            Remarks: 'Check account balance',
            QueueTimeOutURL: this.config.balance.timeout,
            ResultURL: this.config.balance.callback,
        }

        let accountBalance;
        try{
            accountBalance = await reqmaker(
                req.url, 
                'POST',
                {
                    Initiator: req.Initiator,
                    SecurityCredential: req.SecurityCredential,
                    CommandID: req.CommandID,
                    PartyA: req.PartyA,
                    IdentifierType: req.IdentifierType,
                    Remarks: req.Remarks,
                    QueueTimeOutURL: req.QueueTimeOutURL,
                    ResultURL: req.ResultURL
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                }
            );
        }catch(e){
            return e;
        }

        return accountBalance;
        
    }

    async b2b(data: B2b){
        const security = this.config.b2c.security_credential || this.generateSecurityCredential(this.config.b2c.security_credential);
        const req = {
            oauth_token: "Bearer " + await this.oAuth('b2c'),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/b2b/v1/paymentrequest`,
            Initiator: this.config.b2c.initiator_name,
            SecurityCredential: this.config.b2c.security_credential || this.generateSecurityCredential(this.config.c2b.security_credential),
            CommandID: 'MerchantToMerchantTransfer',
            SenderIdentifierType: '4',
            RecieverIdentifierType: '4',
            Amount: data.amount,
            PartyA: this.config.c2b.shortcode,
            PartyB: data.business,
            AccountReference: '1',
            Remarks: 'Transfer to business',
            QueueTimeOutURL: this.config.b2b.timeout,
            ResultURL: this.config.b2b.callback,
            Currency: data.currency
        }

        let b2b;
        try{
            b2b = await reqmaker(
                req.url,
                'POST',
                {
                    "Initiator": req.Initiator,
                    "SecurityCredential": req.SecurityCredential,
                    "CommandID": req.CommandID,
                    "SenderIdentifierType": req.SenderIdentifierType,
                    "RecieverIdentifierType": req.RecieverIdentifierType,
                    "Amount": req.Amount,
                    "PartyA": req.PartyA,
                    "PartyB": req.PartyB,
                    "Remarks": req.Remarks,
                    "QueueTimeOutURL": req.QueueTimeOutURL,
                    "ResultURL": req.ResultURL
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                }

            );
        }catch(e){
            return e;
        }

        return b2b;
       
    }
    async b2c(data: LipaNaMpesaOnline){
        const req = {
            oauth_token: "Bearer " + await this.oAuth('b2c'),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/b2c/v1/paymentrequest`,
            InitiatorName: this.config.b2c.initiator_name,
            SecurityCredential: this.config.b2c.security_credential || this.generateSecurityCredential(this.config.b2c.security_credential),
            CommandID: this.config.b2c.command_id,
            Amount: data.amount,
            shortCode: this.config.b2c.shortcode,
            senderMsisdn: data.phone,
            Remarks: `Send to user`,
            QueueTimeOutURL: this.config.b2c.timeout,
            ResultURL: this.config.b2c.callback,
            Occasion: `Transfer on ${moment().format('YYYY/MM/DD HH:mm')}`,
            user_id: data.user.id,
            Currency: data.currency
        }

        let b2c;
        try{
            b2c = await reqmaker(
                req.url,
                'POST',
                {
                    "InitiatorName": req.InitiatorName,
                    "SecurityCredential": req.SecurityCredential,
                    "CommandID": req.CommandID,
                    "Amount": req.Amount,
                    "PartyA": req.shortCode,
                    "PartyB": req.senderMsisdn,
                    "Remarks": req.Remarks,
                    "QueueTimeOutURL": req.QueueTimeOutURL,
                    "ResultURL": req.ResultURL,
                    "Occasion": req.Occasion
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                }
            );
        }catch(e){
            return e;
        }

        return b2c;

    }
    
    generateSecurityCredential(securityPassword){
        const keyPath =  path.resolve(__dirname, '../certs/mpesa.key');
        const publicKey = fs.readFileSync(keyPath, 'utf8');   
        const buffer = Buffer.from(securityPassword);
        return crypto.publicEncrypt({ key: publicKey, padding: constants.RSA_PKCS1_PADDING }, buffer).toString("base64");
    }

    async c2bRegister(){ 
        const req = {
            oauth_token: "Bearer " + await this.oAuth('c2b'),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/c2b/v1/registerurl`,
            ValidationURL: this.config.c2b.validation_url,
            ConfirmationURL: this.config.c2b.confirmation_url,
            ResponseType: this.config.c2b.response_type,
            ShortCode: this.config.c2b.shortcode,
        }

        let c2bRegister;
        try{
            c2bRegister = await reqmaker(
                req.url,
                'POST',
                {
                    ValidationURL: req.ValidationURL,
                    ConfirmationURL: req.ConfirmationURL,
                    ResponseType: req.ResponseType,
                    ShortCode: req.ShortCode
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                }
            );
        }catch(e){
            return e
        }

        return c2bRegister;

    }

    async c2bSimulate(data: C2bSimulate){
        const req = {
            oauth_token: "Bearer " + await this.oAuth('c2b'),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/c2b/v1/simulate`,
            ShortCode: this.config.c2b.shortcode,
            CommandID: 'CustomerPayBillOnline',
            Amount: data.amount,
            Msisdn: data.phone,
            BillRefNumber: data.reference,
        }

        let c2bSimulate;
        try{
            c2bSimulate = await reqmaker(
                req.url,
                'POST',
                {
                    ShortCode: req.ShortCode,
                    CommandID: req.CommandID,
                    Amount: req.Amount,
                    Msisdn: req.Msisdn,
                    BillRefNumber: req.BillRefNumber
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                  }
            );
        }catch(e){
            return e;
        }

        return c2bSimulate;

     }

    async lipaNaMpesaOnline(data: LipaNaMpesaOnline) {
        const req = {
            oauth_token: "Bearer " + await this.oAuth('c2b'),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/stkpush/v1/processrequest`,
            shortCode: this.config.c2b.stk.shortcode,
            passkey: this.config.c2b.stk.passkey,
            senderMsisdn: data.phone,
            timestamp: moment().format('YYYYMMDDHHmmss'),
            password: '',
            TransactionType: "CustomerPayBillOnline",
            Amount: data.amount,
            Currency: data.currency,
            callbackUrl: this.config.c2b.stk.callback,
            TransactionDesc: "Top Up Account",
            user_id: data.user.id
        };

        req.password = Buffer.from(`${req.shortCode}${req.passkey}${req.timestamp}`).toString('base64');


        let lipaNaMpesaOnline;
        try{
            lipaNaMpesaOnline = await reqmaker(
                req.url,
                'POST',
                {
                    "BusinessShortCode": req.shortCode,
                    "Password": req.password,
                    "Timestamp": req.timestamp,
                    "TransactionType": req.TransactionType,
                    "Amount": req.Amount,
                    "PartyA": req.senderMsisdn,
                    "PartyB": req.shortCode,
                    "PhoneNumber": req.senderMsisdn,
                    "CallBackURL": req.callbackUrl,
                    "AccountReference": "1",
                    "TransactionDesc": req.TransactionDesc
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                  }

            );
        }catch(e){
            return e;
        }

        return lipaNaMpesaOnline;

    }

    async lipaNaMpesaQuery(data){
        const req = {
            oauth_token: "Bearer " + await this.oAuth('c2b'),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/stkpushquery/v1/query`,
            BusinessShortCode: this.config.c2b.shortcode,
            Password: '',
            CheckoutRequestID: data.tras_ref,
            shortCode: this.config.c2b.shortcode,
            passkey: this.config.c2b.stk.passkey,
            Timestamp: moment().format('YYYYMMDDHHmmss'),
        }

        req.Password = Buffer.from(`${req.shortCode}${req.passkey}${req.Timestamp}`).toString('base64');

        let lipaNaMpesaQuery;
        try{
            lipaNaMpesaQuery = await reqmaker(
                req.url,
                'POST',
                {
                    BusinessShortCode: req.BusinessShortCode,
                    Timestamp: req.Timestamp,
                    Password: req.Password,
                    CheckoutRequestID: req.CheckoutRequestID
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                }
            );
        }catch(e){
            return e;
        }

        return lipaNaMpesaQuery

    }

    async oAuth(type){
        if(type === 'c2b'){
            const data: any = await this.oAuthorize(this.config.c2b.consumer_key, this.config.c2b.consumer_secret);
            return data.access_token;
        }

        if(type === 'b2c'){
            const data: any = await this.oAuthorize(this.config.b2c.consumer_key, this.config.b2c.consumer_secret);
            return data.access_token;
        }
    }

    async oAuthorize(ck, cs){
        const consumer_key = ck,
        consumer_secret = cs,
        url = `https://${this.api_status}.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`,
        auth = "Basic " + Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

        let oAuthorize;
        try{
            oAuthorize = await reqmaker(
                url,
                'GET',
                '',
                {
                    "Authorization": auth
                }
            );
        }catch(e){
            return e
        }

        return oAuthorize;

    }

    async reversal(data: Reversal){

        const req = {
            oauth_token: "Bearer " + await this.oAuth(data.type),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/reversal/v1/request`,
            Initiator: this.config[data.type].initiator_name,
            SecurityCredential: this.generateSecurityCredential(this.config[data.type].security_credential),
            CommandID: "TransactionReversal",
            TransactionID: data.tras_ref,
            Amount: data.amount,
            ReceiverParty: data.telephone,
            RecieverIdentifierType: "4",
            QueueTimeOutURL: this.config.reversal.timeout,
            ResultURL: this.config.reversal.callback,
            Remarks: "Reverse transaction",
            Occasion: data.reason
        }

        let reversal;
        try{
            reversal = await reqmaker(
                req.url,
                'POST',
                {
                    Initiator: req.Initiator,
                    SecurityCredential: req.SecurityCredential,
                    CommandID: req.CommandID,
                    TransactionID: req.TransactionID,
                    Amount: req.Amount,
                    ReceiverParty: req.ReceiverParty,
                    RecieverIdentifierType: req.RecieverIdentifierType,
                    QueueTimeOutURL: req.QueueTimeOutURL,
                    ResultURL: req.ResultURL,
                    Remarks: req.Remarks,
                    Occasion: req.Occasion
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                }
            );
        }catch(e){
            return e;
        }

        return reversal;

    }

    async transactionStatus(data: TransactionStatus){ 
        const req = {
            oauth_token: "Bearer " + await this.oAuth(data.type),
            url: `https://${this.api_status}.safaricom.co.ke/mpesa/transactionstatus/v1/query`,
            Initiator: this.config[data.type].initiator_name,
            SecurityCredential: this.generateSecurityCredential(this.config[data.type].security_credential),
            CommandID: "TransactionStatusQuery",
            TransactionID: data.tras_ref,
            PartyA: this.config[data.type].shortcode,
            IdentifierType: '1',
            QueueTimeOutURL: "https://hanti.tospay.net/api/v1/app/hanti/txn/status/queue/timeout",
            ResultURL: "https://hanti.tospay.net/api/v1/mpesa/transaction",
            Remarks: "Check transaction",
            Occasion: "Check transaction"
        }

        let transactionStatus;
        try{
            transactionStatus = await reqmaker(
                req.url,
                'POST',
                {
                    Initiator: req.Initiator,
                    SecurityCredential: req.SecurityCredential,
                    CommandID: req.CommandID,
                    TransactionID: req.TransactionID,
                    PartyA: req.PartyA,
                    QueueTimeOutURL: req.QueueTimeOutURL,
                    IdentifierType: req.IdentifierType,
                    ResultURL: req.ResultURL,
                    Remarks: req.Remarks,
                    Occasion: req.Occasion
                },
                {
                    "Content-Type": "application/json",
                    "Authorization" : req.oauth_token
                }
            );
        }catch(e){
            return e;
        }

        return transactionStatus;

    }

}