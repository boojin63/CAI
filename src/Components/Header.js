import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import "../Css/Header.css";

const Header = () => {
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // 로그인 성공 시 상태 변경
        setModal(false); // 로그인 모달 닫기
    };

    const restrictedNavigate = (path) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            alert("로그인이 필요합니다.");
            toggleModal(); // 로그인 모달 열기
        }
    };

    const ToMain = () => {
        navigate("/");
    };

    return (
        <div className="HeaderContainer">
            <img src="/Images/Logo.png" className="Logo" onClick={ToMain} />
            <div className="HeaderContents">
                <p className="AnalyzeBtn" onClick={() => restrictedNavigate("/analyze")}>
                    AI 분석
                </p>
                <p className="RecordBtn" onClick={() => restrictedNavigate("/history")}>
                    이력조회
                </p>
                <p className="CommunityBtn" onClick={() => restrictedNavigate("/community")}>
                    커뮤니티
                </p>
                <p className="NoticeBtn" onClick={() => restrictedNavigate("/notice")}>
                    NOTICE
                </p>
            </div>
            {isLoggedIn ? (
                <img
                    src="/Images/UserIcon.png"
                    className="UserIcon"
                    alt="사용자 아이콘"
                />
            ) : (
                <p className="LoginBtn" onClick={toggleModal}>
                    LOGIN
                </p>
            )}
            {modal && <Login onLoginSuccess={handleLoginSuccess} />}
        </div>
    );
};

export default Header;
