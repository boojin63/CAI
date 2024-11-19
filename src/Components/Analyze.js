import React, { useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../Css/Analyze.css";

const Analyze = () => {
    const fileInputRef = useRef(null);
    const [videoPreview, setVideoPreview] = useState(null); // 미리보기 URL 상태

    // 파일 선택 트리거
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    // 파일 업로드 처리 및 미리보기 URL 설정
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setVideoPreview(previewUrl); // 미리보기 URL 설정
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
                        <p className="AIbtn2">분석하기</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Analyze;
