import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import "../Css/Header.css"


const Header = () => {

    const navigate = useNavigate();

    const [modal, setModal] =useState(false);

    const toogleModal = () => {

        setModal(!modal)
    }

    const ToMain = () => {

        navigate('/')
    }

    const ToAnalyze = () => {

        navigate('/analyze')
    }

    const ToRecord = () => {

        navigate('/record')
    }

    const ToCommunity = () => {

        navigate('/community')
    }
    
    const ToNotice = () => {

        navigate('/notice')
    }

    return(
        <div className="HeaderContainer">
            <img src="/Images/Logo.png" className="Logo" onClick={ToMain}/>
            <div className="HeaderContents">
                <p className="AnalyzeBtn" onClick={ToAnalyze}>AI 분석</p>
                <p className="RecordBtn" onClick={ToRecord}>이력조회</p>
                <p className="CommunityBtn" onClick={ToCommunity}>커뮤니티</p>
                <p className="NoticeBtn" onClick={ToNotice}>NOTICE</p>
            </div>
            <p className="LoginBtn" onClick={toogleModal}>LOGIN</p>
            {
                modal === true ? <Login/> : null
            }
        </div>
    );
}

export default Header;