const { Router } = require('express');
const { fetchUsers } = require('./services/users');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
