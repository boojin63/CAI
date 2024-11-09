import React, { useState } from 'react';
import '../Css/Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const outsideClick = (e) => {
        if (e.target.classList.contains('LoginContainer')) {
            closeModal();
        }
    };

    const navigate = useNavigate();

    const kakao = () => {

        navigate('/')
    }

    const naver = () => {

        navigate('/')
    }

    const google = () => {

        navigate('/')
    }

    return (

        <div>
            {isModalOpen && (
                <div className='LoginContainer' onClick={(e) => outsideClick(e)}>
                    <div className='LoginContents'>
                        <img src='/Images/X.png' className='CloseBtn' onClick={closeModal} alt="Close" />
                        <p className='Logintxt'>LOGIN</p>
                        <p className='subtxt'>로그인 후 사용가능 한 서비스 입니다.</p>
                        <div className='kakao' onClick={kakao}>
                            <img src='/Images/kakao.png' className='KIcon' />
                            <p>카카오로 시작하기</p>
                        </div>
                        <div className='naver' onClick={naver}>
                            <img src='/Images/naver.png' className='NIcon'/>
                            <p>네이버로 시작하기</p>
                        </div>
                        <div className='google' onClick={google}>
                            <img src='/Images/google.png' className='GIcon'/>
                            <p>구글로 시작하기</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;