const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ success: true, message: 'root' });
});

router.get('/iamrahul', (req, res, next) => {
  res.json({
    success: true,
    color: 'brown',
    dish: 'Chicken Tikka Misala',
    restaurant: 'Taste of Surti',
    address: {
      street: 'Bhangra Ave',
      city: 'Browntown',
      Country: 'USA',
    },
    height: 4.2,
    netWorth: 6.9,
    status: 'cuck',
  });
});

module.exports = router;
