const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', storiesController.getStories);
router.delete('/:id', auth, storiesController.deleteStory);
router.put('/:id', auth, storiesController.updateStory);
router.post('/', auth, storiesController.createStory);

module.exports = router;
