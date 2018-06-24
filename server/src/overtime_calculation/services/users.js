const axios = require('axios');
const { getTimePunchesFromUser } = require('./time_punches');


const getUsersAndTimePunches = async () => {
  const { 25753: users } = await _fetchUsers();

  const response = {};
  for (const userId of Object.keys(users)) {
    const user = users[userId];
    const timePunches = await getTimePunchesFromUser(user);
    response[user.id] = timePunches;
  }

  return response;
};

const _fetchUsers = async () => {
  const { USERS_URL } = process.env;
  const { data } = await axios.get(USERS_URL);
  return data;
};

module.exports = {
  getUsersAndTimePunches,
};
