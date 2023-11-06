    import http from 'k6/http';
    import { check } from 'k6';
    
    export let options = {
        vus: 1, // number of virtual users
        duration: '60s', // duration of the test
    };
    
    export default function() {
        let url = 'https://api.load01.prizepicks.com/aeropay/create_payment';
    
        let headers = {
            'API_KEY': '0b92f9ab74191888b8effaf9ad0e842',
            'USER_ID': '6225347',
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
            'Cookie':'_prizepicks_session=gvx9duFRy9463XhiOUcs9yc8XaG7YR%2Frlb23%2FTuIu6pXuGitbnR8AtC9hfWawm%2F61O2Zg6TwqjDGcX34Y8QR884ALJm7GujauFskHl2%2FhAlWTZmEO6fFfeYNpoPot8ntnNBQMxSriUBvVLmjuNdQb74%2F4%2BO46dfnNhrs%2BVxPjfcnRO5ZusT4yhPnWjmy0lcOkDA6ZypkiX3KUGn7t3f9Ua%2BpMvL60Xpyjowc26LI%2FqXQsUCRsBnjwh2i2U29UUXmeMRUztgs9kdHE6EwFc%2FhKuUTMAzyLZSAFx6Q9jt03s90qF9DnCwqsYcXmtguWC9XnqBsx4O%2F%2BaKRnT92iGj%2BHwPN7MMo0JGimkldwokrCxUwbOdy%2BfpfFjPXhsdOT6yS7RSIGTv%2BzZiS0zIu%2FNhXmwM9Cq2IgpO7%2BG3K6SKUW1s7HkUau2x5ArtT7LJR9cYmYQM%2FSBnOWyCsZzRyJoxxl22YdGMgLI92eA55%2F%2B1ILzpO3nR8gSq4nVdOpQWDbNPA4Qc6PpO9kCuCopyeMQ%3D%3D--a7Zbx4s3bOCGIdsE--On2oLshLInmpFDYDKDSszw%3D%3D; Path=/; HttpOnly; remember_user_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IlcxczFPVEEwT0RRMVhTd2lKREpoSkRBMEpGVnBhemt4VkVkS2NHbERjaTVYY0VVeGMxWlZWMDloWkRBeU9UUmhZemsxTWpBMk9UTmxNbUk1WkdGalpXWXpOMlpsWkRjMlpTSXNJakUyT1RjMU5qUTBPRGN1T0RnMk16WTRPQ0pkIiwiZXhwIjoiMjAyMy0xMC0zMVQxNzo0MToyNy44ODZaIiwicHVyIjoiY29va2llLnJlbWVtYmVyX3VzZXJfdG9rZW4ifX0%3D--51dadf0e56a87f9f5796b5ec40ee4d5928d2689d; Path=/; HttpOnly;'   
        };
    
        let body = JSON.stringify({
            "amount": 10000,
            "bankAccountId": "22612",
            "merchantRefNum": "69e19932-57da-430d-8ff5-677086abbe66",
            "location": {
                "lat": 35.8188513,
                "long": -78.8792148,
                "validLocation": true,
                "mastercardAllowed": false,
                "state": "North Carolina",
                "stateAbbreviation": "NC",
                "f2pOnly": false,
            }
        });
    
        let response = http.post(url, body, { headers: headers });
    
        console.log(`Request Body: ${body}`);
        console.log(`Response Status: ${response.status}`);
        console.log(`Response Body: ${response.body}`);
    
        check(response, {
            'is status 200': (r) => r.status === 200,
        });
    }
    