import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 5,  // number of virtual users
    duration: '1m',  // duration of the test
};

export default function() {
    let baseURL = 'https://api.load01.prizepicks.com';
    let commonHeaders = {
        "Content-Type": "application/json"
    };

    // Scenario 1
    check(http.get('https://load01.prizepicks.com/'), { 'status is 200': (r) => r.status === 200 });
    check(http.get('https://load01.prizepicks.com/deposit', { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });
    check(http.get('https://hosted.paysafe.com/js/v1/latest/paysafe.min.js'), { 'status is 200': (r) => r.status === 200 });
    check(http.get(`${baseURL}/users/current`, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });
    check(http.get(`${baseURL}/promotions`, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });
    check(http.get(`${baseURL}/geo/verify_location?lat=35.8188045&lng=-78.8791922`, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });
    check(http.get(`${baseURL}/leagues?state_code=NC`, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });
    check(http.get(`${baseURL}/projections?league_id=173&per_page=250&state_code=NC&single_stat=true`, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });

    // Page 2
    check(http.get(`${baseURL}/paysafe/current_provider`, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });
    check(http.get(`${baseURL}/paysafe/error_codes`, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });
    check(http.get(`${baseURL}/paysafe/payment_methods`, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });
    check(http.post(`${baseURL}/paysafe/create_payment_new`, {}, { headers: commonHeaders }), { 'status is 200': (r) => r.status === 200 });

    sleep(1);
}
