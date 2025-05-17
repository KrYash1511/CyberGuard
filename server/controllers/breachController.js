const Breach = require('../models/breach');

const checkData = async (req, res) => {
  const { type, value } = req.body;

  if (!type || !value) {
    return res.status(400).json({ message: 'Both type and value are required' });
  }

  let query = {};

  if (type === 'phone') {
    // Remove any '91' prefix
    const cleanedPhone = value.replace(/^91/, '');
    // Use regex to match phone numbers ending with this
    query.phone = { $regex: cleanedPhone + '$' };
  } else if (['name', 'city', 'state'].includes(type)) {
    // Case-insensitive partial match
    query[type] = { $regex: value, $options: 'i' };
  } else {
    return res.status(400).json({ message: 'Invalid search type' });
  }

  try {
    const results = await Breach.find(query);
    if (results.length > 0) {
      res.json({ found: true, data: results });
    } else {
      res.json({ found: false, message: 'No matching records found' });
    }
  } catch (err) {
    console.error('Error searching data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { checkData };
