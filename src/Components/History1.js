import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../Css/Analyze.css";

const History1 = () => {
    const [analysisResult, setAnalysisResult] = useState(null); // 분석 결과 저장

    useEffect(() => {
        // 페이지 로드 시 가짜 데이터를 사용해 분석 결과 표시
        const mockResult = {
            summary: "사거리에서 발생한 교통사고에 대한 블랙박스 영상 분석 결과는 다음과 같습니다. 이번 사고는 A씨가 운전하던 흰색 세단과 B씨가 운전하던 검은색 SUV 간의 충돌로 발생했습니다. 블랙박스 차량은 좌회전 신호에 따라 자회전 중이었으며, 반대편에서 사고 차량(B씨)은 정지선을 넘은 상태에서 직진을 시도하던 중 충돌이 일어난 것으로 확인되었습니다. 당시 신호는 좌회전 신호였으나, 사고 차량이 정지선을 초과한 상황에서 신호를 준수하지 못한 점이 사고의 주요 원인으로 분석됩니다.",
            details: "본 교통사고에 대한 분석 결과, 과실 비율은 **운전자 A: 20%, 운전자 B: 80%**로 예측되었습니다."
        };
        setAnalysisResult(mockResult); // 분석 결과 저장
    }, []); // 빈 배열로 useEffect는 페이지 로드 시 한 번만 실행

    return (
        <div>
            <Header />
            <div className="AnalyzeContainer">
                <div className="AnalyzeContents">
                    <p className="AIText">AI 분석 결과</p>
                    <div className="VideoFrame">
                        <video
                            src="1.mp4"
                            poster="thumbnail.jpg" // 고정 이미지 경로
                            controls={true}       // 비디오 컨트롤 표시
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                    <hr className="Line2" />
                    <div className="ResultContainer">
                        <div className="ResultText">
                            {analysisResult ? (
                                <div>
                                    <h3 className="Title">분석결과</h3>
                                    <p className="Text4">{analysisResult.summary}</p>
                                    <h3 className="Title">과실 비율</h3>
                                    <p className="Text4">{analysisResult.details}</p>
                                </div>
                            ) : (
                                <p>분석 결과를 불러오는 중입니다...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default History1;
