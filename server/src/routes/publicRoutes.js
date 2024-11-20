const express = require('express');
const snippetService = require('../services/snippetService');
const Logger = require('../logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const snippets = await snippetService.getAllPublicSnippets();
    res.json(snippets);
  } catch (error) {
    Logger.error('Error in GET /public/snippets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const snippet = await snippetService.findById(req.params.id);
    if (!snippet) {
      res.status(404).json({ error: 'Snippet not found' });
    } else {
      res.json(snippet);
    }
  } catch (error) {
    Logger.error('Error in GET /public/snippets/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;