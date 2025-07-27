import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AuthContext from './components/AuthContext';
import AuthProvider from './components/AuthProvider';
import MyPage from './components/MyPage';
import GoodsRegistration from './components/GoodsRegistration';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Login' element={<Login />} />
          <Route path='MyPage' element={<MyPage />} />
          <Route path='GoodsRegistration' element={<GoodsRegistration />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
