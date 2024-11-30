import React, { useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../Css/Analyze.css";
import { useNavigate } from "react-router-dom";

const Analyze = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [videoPreview, setVideoPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // 업로드된 파일 저장
    const [analysisResult, setAnalysisResult] = useState(null); // 분석 결과 저장
    const [showResult, setShowResult] = useState(false); // 결과 표시 여부

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setVideoPreview(previewUrl);
            setSelectedFile(file); // 선택된 파일 저장
        }
    };

    const handleAnalyzeClick = async () => {
        if (!selectedFile) {
            alert("분석할 영상을 업로드해주세요.");
            return;
        }

        // 백엔드와 통신하는 코드 주석 처리
        /*
        const formData = new FormData();
        formData.append("video", selectedFile);

        try {
            const response = await fetch("/api/upload-video", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("영상 업로드 실패");
            }

            const result = await response.json();
            setAnalysisResult(result); // 분석 결과 저장
            setShowResult(true); // 결과 표시
            alert("영상 업로드 및 분석이 완료되었습니다.");
        } catch (error) {
            console.error("Error:", error);
            alert("영상 업로드 중 오류가 발생했습니다.");
        }
        */

        // 가짜 데이터를 사용해 결과 표시
        const mockResult = {
            summary: "2024년 9월 3일 오후 3시 20분, 사거리에서 발생한 교통사고에 대한 블랙박스 영상 분석 결과는 다음과 같습니다. 이번 사고는 A씨가 운전하던 흰색 세단과 B씨가 운전하던 검은색 SUV 간의 충돌로 발생했습니다. 블랙박스 차량은 좌회전 신호에 따라 자회전 중이었으며, 반대편에서 사고 차량(B씨)은 정지선을 넘은 상태에서 직진을 시도하던 중 충돌이 일어난 것으로 확인되었습니다. 당시 신호는 좌회전 신호였으나, 사고 차량이 정지선을 초과한 상황에서 신호를 준수하지 못한 점이 사고의 주요 원인으로 분석됩니다.",
            details:"본 교통사고에 대한 분석 결과, 과실 비율은 **운전자 A: 20%, 운전자 B: 80%**로 산정되었습니다.운전자 A씨는 좌회전 신호에 따라 자회전을 진행했으나, 반대편에서 접근하는 차량을 충분히 확인하지 않고 좌회전을 시도한 점에서 전방주시 태만으로 과실이 부과되었습니다.운전자 B씨는 신호가 빨간불임에도 정지선을 넘은 상태에서 직진을 시도한 것으로 확인되었습니다. 이로 인해 전방주시 태만과 운전미숙이 과실로 인정되었으나, 사고 당시 신호 위반이 7대 중과실 사고 기준에는 포함되지 않아 추가적인 중과실로는 판단되지 않았습니다."

        };
        setAnalysisResult(mockResult); // 분석 결과 저장
        setShowResult(true); // 결과 표시
    };

    return (
        <div>
            <Header />
            <div className="AnalyzeContainer">
                <div className="AnalyzeContents">
                    <p className="AIText">AI 분석하기</p>
                    <div className="VideoFrame">
                        {videoPreview ? (
                            <video
                                src={videoPreview}
                                controls
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "black",
                                }}
                            />
                        ) : (
                            <p className="Uploadtext">영상을 업로드해주세요.</p>
                        )}
                    </div>
                    <hr className="Line2" />
                    <div className="AIBtn">
                        <p className="AIbtn1" onClick={handleUploadClick}>
                            영상 업로드
                        </p>
                        <input
                            type="file"
                            accept="video/*"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <p className="AIbtn2" onClick={handleAnalyzeClick}>
                            분석하기
                        </p>
                    </div>
                    {/* 분석 결과 영역: showResult 상태에 따라 표시 */}
                    {showResult && (
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
                                    "분석 결과가 여기에 표시됩니다."
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Analyze;
