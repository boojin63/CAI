import React, { useState, useEffect } from "react";
import axios from "axios"; // 백엔드 호출을 위한 라이브러리
import Header from "./Header";
import Footer from "./Footer";
import "../Css/History.css";

const Record = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]); // 전체 데이터
  const [filteredRecords, setFilteredRecords] = useState([]); // 필터링된 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2; // 한 페이지에 표시할 데이터 수

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:4000/records");
        setRecords(response.data);
        setFilteredRecords(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filtered = records.filter((record) => {
        const recordDate = new Date(record.date);
        const isWithinDateRange =
          (!startDate || recordDate >= new Date(startDate)) &&
          (!endDate || recordDate <= new Date(endDate));
        const matchesSearchTerm = record.title.includes(searchTerm);
        return isWithinDateRange && matchesSearchTerm;
      });
      setFilteredRecords(filtered);
      setCurrentPage(1);
    };

    filterData();
  }, [startDate, endDate, searchTerm, records]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handleQuickFilter = (months) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setMonth(today.getMonth() - months);
    setStartDate(pastDate.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
