import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');

        if (code) {
            fetch('http://localhost:5000/api/kakao/login', { //나중에 백엔드 api 넣어야함
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('백엔드 응답:', data);
                    navigate('/');
                })
                .catch((err) => console.error('백엔드 전송 오류:', err));
        }
    }, [navigate]);

    return <div>카카오 로그인 중...</div>;
};

export default Callback;