const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { getTimePunchesFromUser } = require('../../../../../src/overtime_calculation/services/time_punches');
const baseUserMock = require('../../../../mocks/baseUserMock');
const baseTimePunchesMock = require('../../../../mocks/baseTimePunchesMock');

describe('#getTimePunchesFromUser', () => {
  it('Should calculate no extra wage when user worked 8 hours per day or less', async () => {
    const { TIME_PUNCHES_URL } = process.env;

    const expectedResponse = {
      2017: {
        10: {
          2: {
            entries: {
              '2017-10-10': 8,
              '2017-10-11': 8,
              '2017-10-12': 8,
              '2017-10-13': 8,
              '2017-10-14': 8,
            },
            regularHours: 40,
            regularWage: 400,
            extraDailyHours: 0,
            extraDailyWage: 0,
            extraWeeklyHours: 0,
            extraWeeklyWage: 0,
            totalHours: 40,
            totalWage: 400,
          },
        },
      },
    };

    const mock = new MockAdapter(axios);
    mock.onGet(TIME_PUNCHES_URL).replyOnce(200, baseTimePunchesMock);

    const response = await getTimePunchesFromUser(baseUserMock);
    expect(response).toEqual(expectedResponse);
  });
});
