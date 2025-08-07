import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/login/Login';
import MyPage from '../pages/user/MyPage';
import GoodsRegistration from '../pages/goods/GoodsRegistration';
import SignUp from '../pages/signUp/SignUp';

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path='/MyPage' element={<MyPage />} />
                <Route path='/GoodsRegistration' element={<GoodsRegistration />} />
            </Routes>
        </div>
    );
};

export default AppRouter;