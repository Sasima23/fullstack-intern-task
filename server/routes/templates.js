const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const { category, search } = req.query;
  try {
    const query = db('templates');
    if (category) query.where('category', category);
    if (search) query.where('name', 'like', `%${search}%`);
    const templates = await query.orderBy('id');
    res.json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid template id' });
  }
  try {
    const template = await db('templates').where({ id }).first();
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;