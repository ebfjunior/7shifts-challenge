const { Router } = require('express');
const { getUsersAndTimePunches } = require('./services/users');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await getUsersAndTimePunches();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
