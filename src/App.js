import { Route, Link } from 'react-router-dom';
import './App.css';
import BoardList from "./board/BoardList";
import BoardDetail from "./board/BoardDetail";
import BoardWrite from './board/BoardWrite';
import Login from './board/Login';

function App() {
  return (
    <>
      <h1>CI/CD test v1</h1>
      <Link to="/login">로그인</Link>
      &nbsp;|&nbsp;
      <Link to="/board">게시판</Link>
      <hr/>

      <Route path="/" component={BoardList} exact={true} />
      <Route path="/board" component={BoardList} exact={true} />
      <Route path="/board/write" component={BoardWrite} />
      <Route path="/board/detail/:boardIdx" component={BoardDetail} />
      <Route path="/login" component={Login} />
    </>
  );
}

export default App;
