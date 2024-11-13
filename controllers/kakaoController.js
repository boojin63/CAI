const axios = require('axios');
require('dotenv').config();

exports.kakaoLogin = async (req, res) => {
    const { code } = req.body;

    if (!code) {
        console.error('카카오 로그인 오류: 인증 코드가 없습니다.');
        return res.status(400).json({ error: '인증 코드가 없습니다.' });
    }
    
    try {
        // 카카오 서버에서 액세스 토큰 요청
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_CLIENT_ID,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        console.log('토큰 응답:', tokenResponse.data);

        const { access_token } = tokenResponse.data;

        // 사용자 정보 요청
        const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        console.log('사용자 정보 응답:', userInfoResponse.data);

        const userInfo = userInfoResponse.data;
        const user_id = userInfo.id;

        // 세션에 사용자 정보 저장
        req.session.user_id = user_id;

        res.status(200).json({
            message: '카카오 로그인 성공',
            user: {
                id: user_id,
            },
        });
    } catch (error) {
        console.error('카카오 로그인 오류:', error.response?.data || error.message);
        res.status(500).json({ error: '로그인에 실패했습니다.', details: error.response?.data });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('세션 삭제 오류:', error);
            return res.status(500).json({ error: '로그아웃에 실패했습니다.' });
        }

        // 클라이언트 쿠키에서 세션 ID 삭제
        res.clearCookie('connect.sid'); // 기본 세션 쿠키 이름: 'connect.sid'
        res.status(200).json({ message: '로그아웃 성공' });
    });
};
