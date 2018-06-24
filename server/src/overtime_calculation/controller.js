const { Router } = require('express');
const { fetchUsers } = require('./services/users');
const { getTimePunches } = require('./services/time_punches');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await getTimePunches();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
