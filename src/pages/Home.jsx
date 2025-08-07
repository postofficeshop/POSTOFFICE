import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import GoodsItems from '../features/goods/GoodsItems';
import { GoodsContext } from '../context/goods/GoodsContext';

const Home = () => {
    const {isLogged} = useAuth();
    const {goodsLists} = useContext(GoodsContext);

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
            <div className='grid grid-cols-3 gap-[15px] gap-y-[40px] mt-[50px]'>
                {goodsLists.map((item) => (
                    <GoodsItems 
                        key={item.id}
                        image={item.imageUrl}
                        productName={item.productName}
                        explanation={item.explanation}
                        price={item.price}
                        discount={item.discount}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;