const axios = require('axios');
const MemoryCache = require('../../common/memory_cache');

const getTimePunches = () => MemoryCache.getCachedData('time_punches', _fetchTimePunches);

const _fetchTimePunches = async () => {
  const { TIME_PUNCHES_URL } = process.env;
  const { data } = await axios.get(TIME_PUNCHES_URL);
  return data;
};

module.exports = {
  getTimePunches,
};
