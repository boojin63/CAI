import Header from "./Header";
import Footer from "./Footer";
import "../Css/Main.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Main = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    const restrictedNavigate = (path) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            alert("로그인이 필요합니다.");
        }
    };

    const goAI = () => restrictedNavigate("/analyze");

    return (
        <div>
            <Header />
            <div className="MainContainer">
                <div className="MainContents">
                    <div className="ImageBox">
                        <img src="/Images/Mainbg.png" className="Mainbg" />
                        <div className="bgCover"></div>
                        <div className="MainText">
                            <p className="MainText1">비용 절감과 신속한 대응을 위한</p>
                            <p className="MainText2">AI 기반 사고 해석 솔루션</p>
                            <p className="MainText3">정확한 해석, 그 이상의 가치를 제공합니다.</p>
                            <p className="AIbtn" onClick={goAI}>
                                AI 분석 시작하기
                            </p>
                        </div>
                    </div>

                    

                    <div className="History">
                        <p className="HTitle">사고 분석 사례</p>
                        <div className="HVideo">
                            <img src="/Images/history1.png" className="hVideo1" />
                            <img src="/Images/history2.png" className="hVideo2" />
                            <img src="/Images/history3.png" className="hVideo3" />
                            <img src="/Images/history4.png" className="hVideo4" />
                            <img src="/Images/history1.png" className="hVideo1" />
                        </div>
                        <div className="subTitle">
                            <p>2024-08-17 차선변경</p>
                            <p>2024-07-30 졸음운전</p>
                            <p>2024-09-22 과속</p>
                            <p>2024-02-06 앞지르기</p>
                            <p>2024-08-17 차선변경</p>
                        </div>
                    </div>

                    <hr className="Line1" />
                    
                    <div className="AIMethod">
                        <p className="MTitle">AI 이용방법</p>
                        <div className="MContents">
                            <div className="MImage">
                                <img src="/Images/method1.png" />
                                <img src="/Images/method2.png" />
                                <img src="/Images/method3.png" />
                                <img src="/Images/method4.png" />
                            </div>
                            <div className="MCText">
                                <p className="MCTitle1">
                                    1. 사용중인 기기에 블랙박스 영상 다운로드
                                </p>
                                <p className="MCsub1">
                                    사용하고 계신 PC나 모바일 기기에서 블랙박스 영상을 다운로드하세요.
                                    <br />
                                    블랙박스 제조사나 모델에 따라 제공되는 소프트웨어나 앱을 이용해
                                    <br />
                                    영상을 저장하실 수 있습니다. 영상 파일은 일반적으로 MP4, AVI 등의
                                    <br />
                                    형식으로 저장됩니다.
                                </p>
                                <p className="MCTitle2">
                                    2. AI 분석 시작하기 클릭 후 영상 업로드 페이지 접속
                                </p>
                                <p className="MCsub2">
                                    AI 분석 페이지에 접속 후 AI 분석 시작하기 버튼을 클릭하세요.
                                    <br />
                                    클릭 시 영상 업로드 화면으로 이동합니다.
                                </p>
                                <p className="MCTitle3">
                                    3. 영상 업로드 버튼 클릭하여 파일 선택 혹은 화면 위로 파일 드래그
                                </p>
                                <p className="MCsub3">
                                    영상 업로드 버튼을 클릭 한 후 파일 선택 창에서 다운로드한 블랙박스
                                    영상을 선택하세요.
                                    <br />
                                    또는 파일을 드래그하여 쉽게 업로드할 수도 있습니다.
                                    <br />
                                    파일이 성공적으로 업로드되면, 페이지에 해당 영상의 미리보기와 함께
                                    <br />
                                    업로드 상태가 표시됩니다.
                                </p>
                                <p className="MCTitle4">4. 분석하기 버튼 클릭하여 결과 확인</p>
                                <p className="MCsub4">
                                    분석하기 버튼을 클릭하면 영상을 분석하기 시작합니다.
                                    <br />
                                    분석이 완료되면 분석 결과와 과실 비율에 대한 결과를 확인할 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
