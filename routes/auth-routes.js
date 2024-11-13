const express = require('express');
const router = express.Router();
const kakaoController = require('../controllers/kakaoController');

router.post('/kakao/login', kakaoController.kakaoLogin);
router.post('/logout', kakaoController.logout);

module.exports = router;
