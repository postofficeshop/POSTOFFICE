import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../pages/user/MyPage';
import GoodsRegistration from '../pages/goods/GoodsRegistration';

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/MyPage' element={<MyPage />} />
                <Route path='/GoodsRegistration' element={<GoodsRegistration />} />
            </Routes>
        </div>
    );
};

export default AppRouter;