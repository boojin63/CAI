import React, { useState } from 'react';
import '../Css/Login.css';
import { useNavigate } from 'react-router-dom';

const K_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const K_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();

    const closeModal = () => setIsModalOpen(false);

    const outsideClick = (e) => {
        if (e.target.classList.contains('LoginContainer')) {
            closeModal();
        }
    };

    const KaKaoURL = () => {
        window.location.href = kakaoURL;
        console.log('K_REST_API_KEY:', K_REST_API_KEY);
        console.log('K_REDIRECT_URI:', K_REDIRECT_URI);
    };

    return (
        <div>
            {isModalOpen && (
                <div className="LoginContainer" onClick={outsideClick}>
                    <div className="LoginContents">
                        <img src="/Images/X.png" className="CloseBtn" onClick={closeModal} alt="Close" />
                        <p className="Logintxt">LOGIN</p>
                        <p className="subtxt">로그인 후 사용 가능한 서비스입니다.</p>
                        <div className="kakao" onClick={KaKaoURL}>
                            <img src="/Images/kakao.png" className="KIcon" alt="Kakao Icon" />
                            <p>카카오로 시작하기</p>
                        </div>
                        <div className="naver" onClick={() => navigate('/')}>
                            <img src="/Images/naver.png" className="NIcon" alt="Naver Icon" />
                            <p>네이버로 시작하기</p>
                        </div>
                        <div className="google" onClick={() => navigate('/')}>
                            <img src="/Images/google.png" className="GIcon" alt="Google Icon" />
                            <p>구글로 시작하기</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;