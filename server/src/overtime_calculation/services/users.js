const axios = require('axios');

const fetchUsers = async () => {
  const { USERS_URL } = process.env;
  const { data } = await axios.get(USERS_URL);
  return data;
};

module.exports = {
  fetchUsers,
};
