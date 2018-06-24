const { Router } = require('express');
const { getUsersAndTimePunches } = require('./services/users');
const CustomError = require('../common/custom_error');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await getUsersAndTimePunches();
    res.json(users);
  } catch (err) {
    res.send(new CustomError('It was not possible to get informations', err));
  }
});

module.exports = router;
