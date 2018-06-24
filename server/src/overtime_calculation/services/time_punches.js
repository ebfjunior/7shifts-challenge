const axios = require('axios');
const MemoryCache = require('../../common/memory_cache');
const { getFormattedDate, dateDiff } = require('../../common/date_utils');

const getTimePunches = () => MemoryCache.getCachedData('time_punches', _fetchTimePunches);

const getTimePunchesFromUser = async (user) => {
  const timePunches = await getTimePunches();

  const splittedByDate = _splitTimePunchesByDate(timePunches, user.id);
  const formattedTimePunches = _formatTimePunches(splittedByDate, user);

  return formattedTimePunches;
};

const _splitTimePunchesByDate = (timePunches, userId) => (
  Object.keys(timePunches).reduce((prev, cur) => {
    const newPrev = { ...prev };
    const currentTimePunch = timePunches[cur];
    if (currentTimePunch.userId === userId) {
      const formattedClockedIn = getFormattedDate(currentTimePunch.clockedIn);
      newPrev[formattedClockedIn] = prev[formattedClockedIn] || {
        workedHours: 0,
      };
      newPrev[formattedClockedIn].workedHours += dateDiff(currentTimePunch.clockedIn, currentTimePunch.clockedOut);
      newPrev[formattedClockedIn].hourlyWage = currentTimePunch.hourlyWage;
    }

    return newPrev;
  }, {})
);

const _formatTimePunches = (splittedByDate, user) => {
  const dates = Object.keys(splittedByDate);

  return dates.reduce((prev, cur) => {
    const { year, month, week } = _calculateDateParams(cur);
    const response = _initializeData(prev, cur, year, month, week);
    const { workedHours, hourlyWage } = splittedByDate[cur];
    response[year][month][week].entries[cur] = workedHours;

    const regularHours = workedHours > 8 ? 8 : workedHours;
    const extraHours = workedHours > 8 ? workedHours - 8 : 0;
    if (workedHours > 8) {
      response[year][month][week].extraDailyHours += extraHours;
      response[year][month][week].extraDailyWage += extraHours * hourlyWage * 1.5;
    }
    response[year][month][week].regularHours += regularHours;
    response[year][month][week].regularWage = parseFloat((response[year][month][week].regularWage + (regularHours * hourlyWage)).toFixed(2));
    response[year][month][week].totalHours += workedHours;
    response[year][month][week].totalWage = parseFloat((response[year][month][week].totalWage + (regularHours * hourlyWage) + (extraHours * hourlyWage * 1.5)).toFixed(2));

    const extraWeeklyHours = response[year][month][week].totalHours > 40 ? response[year][month][week].totalHours - 40 : 0;
    response[year][month][week].extraWeeklyHours = extraWeeklyHours;
    response[year][month][week].extraWeeklyWage = extraWeeklyHours > 0 ? extraWeeklyHours * user.hourlyWage : 0;

    return response;
  }, {});
};

const _calculateDateParams = (inputDate) => {
  const split = inputDate.split('-');
  const year = parseInt(split[0], 10);
  const month = parseInt(split[1], 10);
  const date = new Date(inputDate);
  const firstMonthDay = new Date(date.getFullYear(), month - 1, 1);
  const week = parseInt(Math.ceil((date.getDate() / 7) + (date.getDay() < firstMonthDay.getDay() ? 1 : 0)), 10);

  return { year, month, week };
};

const _initializeData = (initial, current, year, month, week) => {
  const response = { ...initial };
  response[year] = response[year] || {};
  response[year][month] = response[year][month] || {};
  response[year][month][week] = response[year][month][week] || {
    entries: {
      [current]: 0,
    },
    regularHours: 0,
    regularWage: 0,
    extraDailyHours: 0,
    extraDailyWage: 0,
    extraWeeklyHours: 0,
    extraWeeklyWage: 0,
    totalHours: 0,
    totalWage: 0,
  };
  return response;
};

const _fetchTimePunches = async () => {
  const { TIME_PUNCHES_URL } = process.env;
  const { data } = await axios.get(TIME_PUNCHES_URL);
  return data;
};

module.exports = {
  getTimePunches,
  getTimePunchesFromUser,
};
