const express = require('express');
const router = express.Router();
const Breach = require('../models/Breach');

// GET /api/breach/search?term=917278719501&type=keyword
router.get('/search', async (req, res) => {
  const { term, type } = req.query;

  if (!term || !type) {
    return res.status(400).json({ message: 'Missing term or type' });
  }

  try {
    let query = {};

    if (type === 'keyword') {
      const normalized = term.replace(/^(\+91|91)/, '').trim();
      query.phone = { $regex: normalized + '$' };
    } else if (type === 'email') {
      query.email = term.toLowerCase();
    }

    const result = await Breach.findOne(query);

    if (!result) {
      return res.json({ breached: false, data: null });
    }

    return res.json({
      breached: true,
      data: {
        breachCount: 1,
        breaches: [
          {
            name: result.name || 'Unknown',
            phone: result.phone,
            city: result.city || 'N/A',
            state: result.state || 'N/A',
            date: result.date || 'N/A',
            affectedAccounts: 1,
            dataTypes: ['Phone', 'Name', 'City', 'State']
          }
        ]
      }
    });
  } catch (err) {
    console.error('Error fetching breach data:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
