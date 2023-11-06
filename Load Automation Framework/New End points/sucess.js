// import necessary module
import http from "k6/http";
import { check } from 'k6';

export let options = {
    vus: 1, // number of virtual users
    duration: '60s', // duration of the test
};


    export default () => {
       
  // define URL and payload
  const url = "https://api.load01.prizepicks.com/aeropay/create_payment";
  
    const payload = JSON.stringify({
        "amount": 2500,
        "bankAccountId": "22612",
        "merchantRefNum": "53b96898-45e0-4e3e-92a1-5a908940ba3c",
        "location": {
            "lat": 35.8188444,
            "long": -78.8790833,
            "validLocation": true,
            "mastercardAllowed": false,
            "state": "North Carolina",
            "stateAbbreviation": "NC",
            "f2pOnly": false
        }
    });
    
    


  const params = {
    response = http.post(
        'https://api.load01.prizepicks.com/aeropay/create_payment',
        {
    headers: {
        'API_KEY': '0b92f9ab74191888b8effaf9ad0e842',
        'USER_ID': '5904836',
       //'Content-Type': 'application/json',
        //'Accept': '*/*',
        //'Accept-Encoding': 'gzip, deflate, br',
       // 'Connection': 'keep-alive',
       // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'Cookie':'_prizepicks_session=gvx9duFRy9463XhiOUcs9yc8XaG7YR%2Frlb23%2FTuIu6pXuGitbnR8AtC9hfWawm%2F61O2Zg6TwqjDGcX34Y8QR884ALJm7GujauFskHl2%2FhAlWTZmEO6fFfeYNpoPot8ntnNBQMxSriUBvVLmjuNdQb74%2F4%2BO46dfnNhrs%2BVxPjfcnRO5ZusT4yhPnWjmy0lcOkDA6ZypkiX3KUGn7t3f9Ua%2BpMvL60Xpyjowc26LI%2FqXQsUCRsBnjwh2i2U29UUXmeMRUztgs9kdHE6EwFc%2FhKuUTMAzyLZSAFx6Q9jt03s90qF9DnCwqsYcXmtguWC9XnqBsx4O%2F%2BaKRnT92iGj%2BHwPN7MMo0JGimkldwokrCxUwbOdy%2BfpfFjPXhsdOT6yS7RSIGTv%2BzZiS0zIu%2FNhXmwM9Cq2IgpO7%2BG3K6SKUW1s7HkUau2x5ArtT7LJR9cYmYQM%2FSBnOWyCsZzRyJoxxl22YdGMgLI92eA55%2F%2B1ILzpO3nR8gSq4nVdOpQWDbNPA4Qc6PpO9kCuCopyeMQ%3D%3D--a7Zbx4s3bOCGIdsE--On2oLshLInmpFDYDKDSszw%3D%3D; Path=/; HttpOnly; remember_user_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IlcxczFPVEEwT0RRMVhTd2lKREpoSkRBMEpGVnBhemt4VkVkS2NHbERjaTVYY0VVeGMxWlZWMDloWkRBeU9UUmhZemsxTWpBMk9UTmxNbUk1WkdGalpXWXpOMlpsWkRjMlpTSXNJakUyT1RjMU5qUTBPRGN1T0RnMk16WTRPQ0pkIiwiZXhwIjoiMjAyMy0xMC0zMVQxNzo0MToyNy44ODZaIiwicHVyIjoiY29va2llLnJlbWVtYmVyX3VzZXJfdG9rZW4ifX0%3D--51dadf0e56a87f9f5796b5ec40ee4d5928d2689d; Path=/; HttpOnly;', 
       // headers: {
        accept : '*/*',
        'access-control-request-headers': 'content-type,x-csrf-token,x-device-id,x-device-info',
        'access-control-request-method': 'POST',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
            accept: 'application/json',
            'content-type': 'application/json',
            'x-csrf-token':
              'HX3NqTc16LXMlS0MRODh69qMpirI9Y0VP0DAfwohc-13Y5Sbm9KjAGLt4zULFSxAo-z0PAx6Y_dXbVJDV1O4Ow',
            'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
            'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',

    },
    }),
    
});

  // send a post request and save response as a variable
  const res = http.post(url, payload, params);
    console.log(`Request Body: ${payload}`);
    console.log(`Response Status: ${res.status}`);
    console.log(`Response Body: ${res.body}`);
  check(res, {
    "response code was 200": (res) => res.status == 200,
  });
}
