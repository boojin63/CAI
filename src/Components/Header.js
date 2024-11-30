import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import "../Css/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, login, logout } = useAuth();
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleLoginSuccess = () => {
        login(); // 로그인 상태를 글로벌 상태로 설정
        setModal(false);
    };

    const handleLogout = () => {
        logout(); // 로그아웃 실행
        alert("로그아웃 되었습니다.");
        navigate("/"); // 로그아웃 후 메인 페이지로 이동
    };

    const restrictedNavigate = (path) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            alert("로그인이 필요합니다.");
            toggleModal();
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
                <div className="UserActions">
                    <img
                        src="/Images/UserIcon.png"
                        className="UserIcon"
                        alt="사용자 아이콘"
                    />
                    <p className="LogoutBtn" onClick={handleLogout}>
                        LOGOUT
                    </p>
                </div>
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
