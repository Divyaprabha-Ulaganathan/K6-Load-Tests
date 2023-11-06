import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('page_1 - https://load01.prizepicks.com/', function () {
    response = http.get('https://load01.prizepicks.com/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(0.9)
    response = http.options('https://api.load01.prizepicks.com/users/current', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-device-id,x-device-info',
        'access-control-request-method': 'GET',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/users/current', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '',
        'x-device-info': 'name=,os=,osVersion=,isSimulator=,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.options('https://api.load01.prizepicks.com/leagues', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-device-id,x-device-info',
        'access-control-request-method': 'GET',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/leagues', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '',
        'x-device-info': 'name=,os=,osVersion=,isSimulator=,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.options('https://api.load01.prizepicks.com/users/sign_out', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-device-id,x-device-info',
        'access-control-request-method': 'DELETE',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })
    response = http.options(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type,x-device-id,x-device-info',
          'access-control-request-method': 'GET',
          origin: 'https://load01.prizepicks.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(3.2)
  })

  group('page_2 - https://load01.prizepicks.com/login', function () {
    response = http.get(
      'https://api.load01.prizepicks.com/geo/verify_location?lat=35.8188658&lng=-78.8792281',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.options(
      'https://api.load01.prizepicks.com/geo/verify_location?lat=35.8188658&lng=-78.8792281',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type,x-device-id,x-device-info',
          'access-control-request-method': 'GET',
          origin: 'https://load01.prizepicks.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    sleep(2.3)
    response = http.options('https://api.load01.prizepicks.com/users/sign_in', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-device-id,x-device-info',
        'access-control-request-method': 'POST',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/users/current', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
  })

  group('page_3 - https://load01.prizepicks.com/', function () {
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://api.load01.prizepicks.com/leagues', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.options('https://api.load01.prizepicks.com/promotions', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-device-id,x-device-info',
        'access-control-request-method': 'GET',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/promotions', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(2)
  })

  group('page_4 - https://load01.prizepicks.com/deposit', function () {
    response = http.get('https://api.load01.prizepicks.com/paysafe/current_provider', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'egtEdYR1tGcTZ4hoRAjGKUkdpzHnTWdGxDH1ZQQXX1o8j_H0gFMsjbS4U2XLFkmQt7tzmsYsP8ojVHshxHKKaQ',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })

    response = http.options('https://api.load01.prizepicks.com/paysafe/current_provider', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-csrf-token,x-device-id,x-device-info',
        'access-control-request-method': 'GET',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.options('https://api.load01.prizepicks.com/paysafe/error_codes', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-csrf-token,x-device-id,x-device-info',
        'access-control-request-method': 'GET',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.get('https://api.load01.prizepicks.com/paysafe/error_codes', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'egtEdYR1tGcTZ4hoRAjGKUkdpzHnTWdGxDH1ZQQXX1o8j_H0gFMsjbS4U2XLFkmQt7tzmsYsP8ojVHshxHKKaQ',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })

    response = http.options('https://api.load01.prizepicks.com/paysafe/payment_methods', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-csrf-token,x-device-id,x-device-info',
        'access-control-request-method': 'GET',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.get('https://api.load01.prizepicks.com/paysafe/payment_methods', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'egtEdYR1tGcTZ4hoRAjGKUkdpzHnTWdGxDH1ZQQXX1o8j_H0gFMsjbS4U2XLFkmQt7tzmsYsP8ojVHshxHKKaQ',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(12)

    response = http.options('https://api.load01.prizepicks.com/aeropay/create_payment', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type,x-csrf-token,x-device-id,x-device-info',
        'access-control-request-method': 'POST',
        origin: 'https://load01.prizepicks.com',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.post(
      'https://api.load01.prizepicks.com/aeropay/create_payment',
      '{"amount":2500,"bankAccountId":"13653","merchantRefNum":"7aef2ff0-5d41-4fac-b03b-3c0d0c5d0293","location":{"lat":35.8188658,"long":-78.8792281,"validLocation":true,"mastercardAllowed":false,"state":"North Carolina"}}',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-csrf-token':
            'egtEdYR1tGcTZ4hoRAjGKUkdpzHnTWdGxDH1ZQQXX1o8j_H0gFMsjbS4U2XLFkmQt7tzmsYsP8ojVHshxHKKaQ',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(21.2)
  })

  group('page_5 - https://load01.prizepicks.com/deposit-confirmation-page', function () {
    response = http.get('https://api.load01.prizepicks.com/users/current', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(5)
  })

  group('page_7 - https://load01.prizepicks.com/board', function () {
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://api.load01.prizepicks.com/leagues', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
  })

  group('page_8 - https://load01.prizepicks.com/', function () {
    response = http.get('https://load01.prizepicks.com/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(0.6)
    response = http.get('https://api.load01.prizepicks.com/users/current', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '',
        'x-device-info': 'name=,os=,osVersion=,isSimulator=,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/leagues', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '',
        'x-device-info': 'name=,os=,osVersion=,isSimulator=,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '',
          'x-device-info': 'name=,os=,osVersion=,isSimulator=,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(3.8)
    response = http.get(
      'https://api.load01.prizepicks.com/geo/verify_location?lat=35.8188563&lng=-78.8792247',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.options(
      'https://api.load01.prizepicks.com/geo/verify_location?lat=35.8188563&lng=-78.8792247',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type,x-device-id,x-device-info',
          'access-control-request-method': 'GET',
          origin: 'https://load01.prizepicks.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    sleep(3.3)
  })

  group('page_9 - https://load01.prizepicks.com/login', function () {
    response = http.get('https://api.load01.prizepicks.com/users/current', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
  })

  group('page_10 - https://load01.prizepicks.com/', function () {
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://api.load01.prizepicks.com/leagues', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/promotions', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(2.4)
  })

  group('page_11 - https://load01.prizepicks.com/deposit', function () {
    response = http.get('https://api.load01.prizepicks.com/paysafe/current_provider', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'IEvbS0DwYMkkz8TAMHYMoS1vgjl7uJqa9bdubrJDBlTZiIFUSWBW8-k-kzZzv3goAj2QKgOjNjfVunx713_MIw',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })

    response = http.get('https://api.load01.prizepicks.com/paysafe/error_codes', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'IEvbS0DwYMkkz8TAMHYMoS1vgjl7uJqa9bdubrJDBlTZiIFUSWBW8-k-kzZzv3goAj2QKgOjNjfVunx713_MIw',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })

    response = http.get('https://api.load01.prizepicks.com/paysafe/payment_methods', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'IEvbS0DwYMkkz8TAMHYMoS1vgjl7uJqa9bdubrJDBlTZiIFUSWBW8-k-kzZzv3goAj2QKgOjNjfVunx713_MIw',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(12.6)

    response = http.post(
      'https://api.load01.prizepicks.com/aeropay/create_payment',
      '{"amount":2500,"bankAccountId":"13663","merchantRefNum":"69772c55-8484-401b-b999-7a997c681877","location":{"lat":35.8188563,"long":-78.8792247,"validLocation":true,"mastercardAllowed":false,"state":"North Carolina"}}',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-csrf-token':
            'IEvbS0DwYMkkz8TAMHYMoS1vgjl7uJqa9bdubrJDBlTZiIFUSWBW8-k-kzZzv3goAj2QKgOjNjfVunx713_MIw',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(13.4)
  })

  group('page_12 - https://load01.prizepicks.com/deposit-confirmation-page', function () {
    response = http.get('https://api.load01.prizepicks.com/users/current', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(1.9)
  })

  group('page_13 - https://load01.prizepicks.com/deposit', function () {
    response = http.get('https://api.load01.prizepicks.com/paysafe/current_provider', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'IEvbS0DwYMkkz8TAMHYMoS1vgjl7uJqa9bdubrJDBlTZiIFUSWBW8-k-kzZzv3goAj2QKgOjNjfVunx713_MIw',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/paysafe/error_codes', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'IEvbS0DwYMkkz8TAMHYMoS1vgjl7uJqa9bdubrJDBlTZiIFUSWBW8-k-kzZzv3goAj2QKgOjNjfVunx713_MIw',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/paysafe/payment_methods', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'IEvbS0DwYMkkz8TAMHYMoS1vgjl7uJqa9bdubrJDBlTZiIFUSWBW8-k-kzZzv3goAj2QKgOjNjfVunx713_MIw',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(3.1)
  })

  group('page_14 - https://load01.prizepicks.com/board', function () {
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://api.load01.prizepicks.com/leagues', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/promotions', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(5.1)
  })

  group('page_15 - https://load01.prizepicks.com/withdrawal', function () {
    response = http.get('https://api.load01.prizepicks.com/paysafe/error_codes', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'aA94ggOcbpOFAFoBxK0b-FLiOIrg9H3z9s0B9NO9R9qRzCKdCgxYqUjxDfeHZG9xfbAqmZjv0V7WwBPhtoGNrQ',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/paysafe/withdrawal/withdrawal_methods', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'aA94ggOcbpOFAFoBxK0b-FLiOIrg9H3z9s0B9NO9R9qRzCKdCgxYqUjxDfeHZG9xfbAqmZjv0V7WwBPhtoGNrQ',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.options(
      'https://api.load01.prizepicks.com/paysafe/withdrawal/withdrawal_methods',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type,x-csrf-token,x-device-id,x-device-info',
          'access-control-request-method': 'GET',
          origin: 'https://load01.prizepicks.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    response = http.get('https://api.load01.prizepicks.com/users/current', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/paysafe/current_provider', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-csrf-token':
          'aA94ggOcbpOFAFoBxK0b-FLiOIrg9H3z9s0B9NO9R9qRzCKdCgxYqUjxDfeHZG9xfbAqmZjv0V7WwBPhtoGNrQ',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(5.3)
    response = http.get(
      'https://api.load01.prizepicks.com/paysafe/withdrawal/withdrawal_requests',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-csrf-token':
            'aA94ggOcbpOFAFoBxK0b-FLiOIrg9H3z9s0B9NO9R9qRzCKdCgxYqUjxDfeHZG9xfbAqmZjv0V7WwBPhtoGNrQ',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.options(
      'https://api.load01.prizepicks.com/paysafe/withdrawal/withdrawal_requests',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type,x-csrf-token,x-device-id,x-device-info',
          'access-control-request-method': 'GET',
          origin: 'https://load01.prizepicks.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    response = http.get(
      'https://api.load01.prizepicks.com/paysafe/withdrawal/withdrawal_requests',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-csrf-token':
            'aA94ggOcbpOFAFoBxK0b-FLiOIrg9H3z9s0B9NO9R9qRzCKdCgxYqUjxDfeHZG9xfbAqmZjv0V7WwBPhtoGNrQ',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.options(
      'https://api.load01.prizepicks.com/paysafe/withdrawal/withdrawal_requests',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type,x-csrf-token,x-device-id,x-device-info',
          'access-control-request-method': 'GET',
          origin: 'https://load01.prizepicks.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    sleep(3.5)
  })

  group('page_16 - https://load01.prizepicks.com/board', function () {
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
          'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://api.load01.prizepicks.com/leagues', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/promotions', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '6a52fa69-4fc8-4776-b8e7-0867f2d8a90b',
        'x-device-info': 'name=,os=mac,osVersion=10.15.7,isSimulator=false,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(3.6)
  })

  group('page_18 - https://load01.prizepicks.com/', function () {
    response = http.get('https://load01.prizepicks.com/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/users/current', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '',
        'x-device-info': 'name=,os=,osVersion=,isSimulator=,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://api.load01.prizepicks.com/leagues', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-device-id': '',
        'x-device-info': 'name=,os=,osVersion=,isSimulator=,appVersion=web',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://api.load01.prizepicks.com/projections?league_id=173&per_page=250&single_stat=true',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-device-id': '',
          'x-device-info': 'name=,os=,osVersion=,isSimulator=,appVersion=web',
          'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
  })
}
