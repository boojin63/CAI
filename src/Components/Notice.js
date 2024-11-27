import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import '../Css/Notice.css';

const Notice = () => {
  return (
    <div>
      <Header />
      <div className="NoticeContainer">
        {/* <nav className="NoticeBreadcrumb">
          <span>홈</span> &gt; <span>NOTICE</span> &gt; <span>이용약관</span>
        </nav> */}
        <header className="NoticeHeader">
          <h1>이용약관</h1>
        <main className="NoticeContent">
          <ol>
            <li>본 서비스는 AI 기반 사고 경위 분석을 통해 24시간 연중무휴로 이용할 수 있으며, 언제든 편리하게 접근하여 결과를 확인할 수 있습니다.</li>
            <li>모든 사용자의 데이터를 안전하게 보호하기 위해 철저한 보안 관리 시스템을 적용하고 있으며, 고객의 데이터는 승인된 이외의 접근이 불가능하도록 설정되어 있습니다.</li>
            <li>서비스의 최적화를 위해 정기적으로 소프트웨어 업데이트를 진행하고 있으며, 이를 통해 더욱 빠르고 정확한 사고 분석을 경험할 수 있습니다.</li>
            <li>본 블랙박스 해석 서비스는 기업 전용 솔루션으로, 각 기업의 효율성을 높이고 신속한 대응을 돕기 위해 설계되었습니다.</li>
            <li>AI 알고리즘의 고도화된 분석 기술을 기반으로, 단순 사고 보고가 아닌 정밀한 경위 해석을 제공하여 고객의 업무 부담을 경감시킵니다.</li>
            <li>본 서비스는 사용자 정보 보호를 최우선으로 고려하여 설계되었으며, 모든 개인정보는 암호화 처리를 통해 외부로부터 안전하게 보호됩니다.</li>
            <li>서비스 이용 시 발생하는 모든 데이터는 안전한 서버 내에서 암호화된 상태로 저장되며, 데이터 유출 위험을 최소화하기 위해 엄격히 관리됩니다.</li>
            <li>안정적인 서비스 제공을 위해 최적화된 서버 환경을 유지하며, 예상치 못한 상황 발생 시에도 신속하게 대응할 수 있도록 설비를 강화하고 있습니다.</li>
            <li>회원 가입 후 일정 기간 동안 무료 체험을 제공하여, 서비스 기능을 직접 경험하고 효율성을 체감할 수 있는 기회를 드립니다.</li>
            <li>기술 지원이나 서비스 관련 문의가 필요할 경우, 앱 내 고객센터에서 신속한 상담을 제공하여 고객의 원활한 서비스 이용을 돕고 있습니다.</li>
          </ol>
        </main>
        </header>
      </div>
      <Footer />
    </div>
  );
};

export default Notice;