const K_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const K_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

const KaKaoRedirect =
`https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

export default KaKaoRedirect;