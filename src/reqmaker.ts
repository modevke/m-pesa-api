import moment from 'moment-timezone';
import axios, { Method } from 'axios';

export default function(url: string, method: Method, data: any = '', headers: object = {  'Content-Type': 'application/json' }){

    const now = moment.tz(moment(), 'Africa/Nairobi').format('DD/MM/YYYY HH:mm');
    console.log(`${now} - ${url}`);
    return new Promise( (resolve, reject) => {
        axios({
            url: url,
            method: method,
            headers: headers,
            data: data
        }).then((response) => {
            console.log(response.status);
            resolve(response.data)
        }).catch((error) => {
            console.log(error.response.status);
            reject(error.response.data);
        })

    });

}
