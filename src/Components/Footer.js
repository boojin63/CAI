import { useNavigate } from 'react-router-dom';
import '../Css/Footer.css'

const Footer = () => {

    const navigate = useNavigate();

    const ToMain = () => {
        navigate('/');
    }

    return (
        <div className="FooterContainer">
            <div className='FooterContents'>
                <img src='/Images/Logo.png' className='FtLogo' onClick={ToMain} />
                <p className='Text1'>상호 : CAI</p>
                <p className='Text2'>대표자명 : 최태용</p>
                <p className='Text3'>주소 : 경상북도 안동시 경동로 1375</p>
            </div>
            <div className='FooterContents2'>
                <p>이용약관</p>
                <p>개인정보처리방침</p>
                <p>분석정책</p>
            </div>
        </div>
    );
}

export default Footer;