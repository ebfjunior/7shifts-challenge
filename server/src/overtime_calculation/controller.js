const { Router } = require('express');
const { fetchUsers } = require('./services/users');
const { getTimePunchesFromUser } = require('./services/time_punches');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await getTimePunchesFromUser(517150);
    res.json(users);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
