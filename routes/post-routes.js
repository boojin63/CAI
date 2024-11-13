const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');
const auth = require('../middlewares/auth');

router.post('/create', auth.isAuthenticated, postController.createPost);
router.delete('/delete/:post_id', auth.isAuthenticated, postController.deletePost);
router.put('/update/:post_id', auth.isAuthenticated, postController.updatePost);

module.exports = router;
