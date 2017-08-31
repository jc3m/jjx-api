const express = require('express');

const router = express.Router();

router.use('/', (req, res, next) => {
  res.json({ success: true, message: 'root' });
});

module.exports = router;

