import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
       // { duration: '5m', target: 100 },
        { duration: '1m', target: 0 },
    ],
};

let headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_TOKEN_HERE'  // Uncomment and replace if needed.
};

function fetchURL(url) {
    let response = http.get(url);
    check(response, {
        'status is 200': (r) => r.status === 200,
    });
}

function sendPOST(url, payload) {
    let response = http.post(url, JSON.stringify(payload), { headers: headers });
    check(response, {
        'Posted sucessfully': (r) => r.status === 200,
    });
}

function userThinkTime(seconds) {
    sleep(seconds);
}

export default function() {
    fetchURL('https://load01.prizepicks.com/');
    fetchURL('https://load01.prizepicks.com/deposit');
    fetchURL('https://api.load01.prizepicks.com/users/current');
    fetchURL('https://api.load01.prizepicks.com/promotions');
    userThinkTime(1);

    fetchURL('https://api.load01.prizepicks.com/paysafe/current_provider');
    fetchURL('https://api.load01.prizepicks.com/paysafe/error_codes');
    fetchURL('https://api.load01.prizepicks.com/paysafe/payment_methods');
    fetchURL('https://api.load01.prizepicks.com/geo/verify_location?lat=35.8188548&lng=-78.8792646');

    let payload = {
        "amount": 10000,
        "bankAccountId": "22612",
        "merchantRefNum": "84ec2419-6ee2-49ec-8929-8e10b7553e1a",
        "location": {
            "lat": 35.8188548,
            "long": -78.8792646,
            "validLocation": true,
            "mastercardAllowed": false,
            "state": "North Carolina",
            "stateAbbreviation": "NC",
            "f2pOnly": false
        }
    };

    sendPOST('https://api.load01.prizepicks.com/aeropay/create_payment', payload);
    userThinkTime(1);

    fetchURL('https://api.load01.prizepicks.com/users/current');
    fetchURL('https://api.load01.prizepicks.com/transactions?page=1&perPage=5');
    fetchURL('https://api.load01.prizepicks.com/paysafe/payments/84ec2419-6ee2-49ec-8929-8e10b7553e1a');
    userThinkTime(1);
}
