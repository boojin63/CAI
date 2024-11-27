import React, { useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../Css/Analyze.css";

const Analyze = () => {
    const fileInputRef = useRef(null);
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
                            <div className="ResultTitle">분석결과</div>
                            <div className="ResultText">
                                {analysisResult ? (
                                    <div>
                                        <h3>결과 요약:</h3>
                                        <p>{analysisResult.summary}</p>
                                        <h3>상세 분석:</h3>
                                        <ul>
                                            {analysisResult.details.map((detail, index) => (
                                                <li key={index}>{detail}</li>
                                            ))}
                                        </ul>
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
