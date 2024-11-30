import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../Css/History.css";

const Record = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // 한 페이지에 표시할 데이터 수

  // 초기 데이터
  const records = [
    { id: 1, title: "2024년 8월 29일 사고", user: "Speedster123", date: "2024-08-29 15:57:22", description: "Collision between a white sedan and a black SUV due to a traffic signal violation." },
    { id: 2, title: "2024년 8월 31일 사고", user: "RoadWarrior", date: "2024-08-31 12:15:45", description: "Collision at an intersection between a vehicle going straight and another making a left turn." },
    { id: 3, title: "2024년 9월 1일 사고", user: "MotoMaster", date: "2024-09-01 18:22:11", description: "A minor accident involving a motorcycle and a white sedan, causing the motorcycle to fall over." },
    { id: 4, title: "2024년 9월 3일 사고", user: "LeftTurnHero", date: "2024-09-03 14:10:32", description: "Collision between a black SUV and a blue sedan during an unprotected left turn." },
    { id: 5, title: "2024년 9월 5일 사고", user: "WetRoads", date: "2024-09-05 09:50:00", description: "A white truck skidded on a wet road and collided with a silver sedan." },
    { id: 6, title: "2024년 9월 7일 사고", user: "ReversingPro", date: "2024-09-07 20:30:21", description: "A black SUV reversing at a parking lot exit collided with a pedestrian." },
    { id: 7, title: "2024년 9월 9일 사고", user: "TaxiTrouble", date: "2024-09-09 17:05:16", description: "A collision between a motorcycle and a yellow taxi, causing minor injuries to the motorcyclist." },
    { id: 8, title: "2024년 9월 11일 사고", user: "SUVFanatic", date: "2024-09-11 11:45:00", description: "Collision at an uncontrolled intersection between a blue SUV and a white sedan." },
    { id: 9, title: "2024년 9월 13일 사고", user: "RedLightRunner", date: "2024-09-13 19:20:00", description: "A white sedan crossed the stop line during a red light and collided with a vehicle going straight." },
    { id: 10, title: "2024년 9월 15일 사고", user: "HighwayBlues", date: "2024-09-15 22:00:33", description: "A multi-vehicle collision caused by sudden braking at a tollgate on the highway." }
];



  // 필터링된 데이터
  const filteredRecords = records.filter((record) => {
    const recordDate = new Date(record.date);
    const isWithinDateRange =
      (!startDate || recordDate >= new Date(startDate)) &&
      (!endDate || recordDate <= new Date(endDate));
    const matchesSearchTerm = record.title.includes(searchTerm);
    return isWithinDateRange && matchesSearchTerm;
  });

  // 페이지네이션 처리
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // 빠른 기간 버튼 처리
  const handleQuickFilter = (months) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setMonth(today.getMonth() - months);
    setStartDate(pastDate.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  };

  // 페이지 변경
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 초기화
  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div>
      <Header />
      <div className="record-container">
        {/* 검색 영역 */}
        <div className="search-bar">
          <div className="search-options">
            <label className="label">조회일자</label>
            <input
              type="date"
              className="date-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            ~
            <input
              type="date"
              className="date-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="quick-buttons">
              <button className="quick-btn" onClick={() => handleQuickFilter(3)}>
                3개월
              </button>
              <button className="quick-btn" onClick={() => handleQuickFilter(6)}>
                6개월
              </button>
              <button className="quick-btn" onClick={() => handleQuickFilter(12)}>
                1년
              </button>
              <button className="quick-btn" onClick={() => handleQuickFilter(24)}>
                2년
              </button>
            </div>
          </div>
          <div className="search-field-container">
            <label className="label">조회명</label>
            <input
              type="text"
              className="search-field"
              placeholder="조회명 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="reset-btn" onClick={resetFilters}>
              초기화
            </button>
            <button className="search-btn">조회</button>
          </div>
        </div>

        {/* 결과 영역 */}
        <div className="results">
          <p className="result-count">
            총 <span className="highlighted">{filteredRecords.length}</span> 건
          </p>
          <table className="record-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>등록자</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.title}</td>
                  <td>{record.user}</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Record;
