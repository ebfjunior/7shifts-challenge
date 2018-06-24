const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { getTimePunchesFromUser } = require('../../../../../src/overtime_calculation/services/time_punches');
const baseUserMock = require('../../../../mocks/baseUserMock');
const baseTimePunchesMock = require('../../../../mocks/baseTimePunchesMock');

describe('#getTimePunchesFromUser', () => {
  it('Should calculate extra daily wage when user worked more than 8 hours in a day at least once', async () => {
    const { TIME_PUNCHES_URL } = process.env;

    const mockTimePunches = {
      ...baseTimePunchesMock,
      1: {
        clockedIn: '2017-10-11 05:11:00',
        clockedOut: '2017-10-11 14:11:00',
        created: '2017-10-11 10:11:00',
        hourlyWage: 10,
        id: 9,
        locationId: 25753,
        modified: '2017-10-12 05:45:49',
        userId: 517147,
      },
      2: {
        clockedIn: '2017-10-11 16:15:00',
        clockedOut: '2017-10-11 20:36:00',
        created: '2017-10-11 10:11:00',
        hourlyWage: 10,
        id: 10,
        locationId: 25753,
        modified: '2017-10-12 05:45:49',
        userId: 517147,
      },
      9: {
        clockedIn: '2017-10-10 10:11:00',
        clockedOut: '2017-10-10 13:11:00',
        created: '2017-10-11 10:11:00',
        hourlyWage: 10,
        id: 9,
        locationId: 25753,
        modified: '2017-10-12 05:45:49',
        userId: 517147,
      },
      10: {
        clockedIn: '2017-10-10 16:15:00',
        clockedOut: '2017-10-10 16:15:00',
        created: '2017-10-11 10:11:00',
        hourlyWage: 10,
        id: 10,
        locationId: 25753,
        modified: '2017-10-12 05:45:49',
        userId: 517147,
      },
    };

    const expectedResponse = {
      2017: {
        10: {
          2: {
            entries: {
              '2017-10-10': 3,
              '2017-10-11': 13,
              '2017-10-12': 8,
              '2017-10-13': 8,
              '2017-10-14': 8,
            },
            regularHours: 35,
            regularWage: 350,
            extraDailyHours: 5,
            extraDailyWage: 75,
            extraWeeklyHours: 0,
            extraWeeklyWage: 0,
            totalHours: 40,
            totalWage: 425,
          },
        },
      },
    };

    const mock = new MockAdapter(axios);
    mock.onGet(TIME_PUNCHES_URL).replyOnce(200, mockTimePunches);

    const response = await getTimePunchesFromUser(baseUserMock);
    expect(response).toEqual(expectedResponse);
  });
});
