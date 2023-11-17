import axios from "axios";
import { useState } from "react";

const Login = ({ history }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handlerChangeId = e => setId(e.target.value);
    const handlerChangePassword = e => setPassword(e.target.value);
    const handlerLogin = e => {
        const data = {
            id, 
            password
        };
        axios.post(`${process.env.REACT_APP_BOARD_API_URL}/login`, data)
        .then(res => {
            console.log(res);
            // 로그인 성공 시 발급받은 토큰을 세션 스토리지에 저장 
            // 인증을 필요로 하는 기능을 요청할 때 해당 정보를 요청 헤더에 포함해서 함께 전달
            if (res.data.statusCode === 200) {
                sessionStorage.setItem("JWT_TOKEN", res.data.body);
                history.push('/board');         // 로그인 성공 시 게시판 목록으로 이동 
            } else {
                sessionStorage.clear();
                alert('로그인에 실패했습니다.');
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <>
            ID: <input type="text" value={id} onChange={handlerChangeId} />
            <br/>
            PW: <input type="password" value={password} onChange={handlerChangePassword} />
            <br/>
            <button onClick={handlerLogin}>로그인</button>
        </>
    );
};

export default Login;
