import Header from "./Header";
import Footer from "./Footer"
import '../Css/Main.css'
import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();

    const goAI = () => {
        navigate('/analyze')
    }

    return (
        <div>
            <Header />
            <div className="MainContainer">
                <div className="MainContents">
                    <div className="ImageBox">
                        <img src="/Images/Mainbg.png" className="Mainbg" />
                        <div className="bgCover"> </div>
                        <div className="MainText">
                            <p className="MainText1">비용 절감과 신속한 대응을 위한</p>
                            <p className="MainText2">AI 기반 사고 해석 솔루션</p>
                            <p className="MainText3">정확한 해석, 그 이상의 가치를 제공합니다.</p>
                            <p className="AIbtn" onClick={goAI}>AI 분석 시작하기</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Main;