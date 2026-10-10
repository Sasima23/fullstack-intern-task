const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// every route here needs a valid token
router.use(auth);

// GET /api/favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await db('favorites')
      .join('templates', 'favorites.template_id', 'templates.id')
      .where('favorites.user_id', req.user.id)
      .select('templates.*');
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/favorites/:templateId
router.post('/:templateId', async (req, res) => {
  const templateId = Number(req.params.templateId);
  if (!Number.isInteger(templateId)) {
    return res.status(400).json({ error: 'Invalid template id' });
  }
  try {
    const template = await db('templates').where({ id: templateId }).first();
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const existing = await db('favorites')
      .where({ user_id: req.user.id, template_id: templateId })
      .first();
    if (existing) {
      return res.status(409).json({ error: 'Already in favorites' });
    }

    await db('favorites').insert({ user_id: req.user.id, template_id: templateId });
    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/favorites/:templateId  (to un-favorite, frontend-ku venum)
router.delete('/:templateId', async (req, res) => {
  const templateId = Number(req.params.templateId);
  if (!Number.isInteger(templateId)) {
    return res.status(400).json({ error: 'Invalid template id' });
  }
  try {
    await db('favorites')
      .where({ user_id: req.user.id, template_id: templateId })
      .del();
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;