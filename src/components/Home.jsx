import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from './useAuth';

const Home = () => {
    const {isLogged} = useAuth();

    return (
        <div className='w-[1200px] mx-auto my-0 pt-[20px] pb-[100px]'>
            {
            isLogged ? 
                <Link 
                    to={'/GoodsRegistration'}
                    className='w-[120px] h-[40px] bg-[#ddd] flex items-center justify-center rounded-[40px]' 
                >
                    물품 등록
                </Link>
                : ''
            }
        </div>
    );
};

export default Home;