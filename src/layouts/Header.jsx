import React from 'react';
import logo from "../assets/images/imgi_191_img_logo.gif";
import searchIco from "../assets/images/imgi_192_img_headsearch.gif";
import loginIco from '../assets/images/imgi_193_icon_login.gif';
import cartIco from '../assets/images/imgi_194_icon_cart.gif';
import myShoppingIco from '../assets/images/imgi_195_icon_myshopping.jpg';
import hamIco from '../assets/images/imgi_16_icon_allmenu_off.gif';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const gnbItemStyle = "pt-[10px] pb-[10px] pl-[10px] pr-[10px] text-[15px] font-medium";

const Header = () => {
    const {isLogged, setIsLogged, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if(isLogged === true) {
            if(confirm('정말 로그아웃 하시겠습니까?')) {
                try{
                    const res = await fetch('http://localhost:4000/logout', {
                        method: 'POST',
                        credentials: 'include', 
                    });
                    
                if(!res.ok) {
                    throw new Error('로그아웃 실패');
                }

                logout();
                setIsLogged(false);
                navigate('/');
                } catch(err) {
                    console.error('로그아웃 오류', err);
                };
            } 
        } else {
            navigate('/Login');
        }
    };

    return (
        <header className="border-b-[1px] border-b-[#ddd] mx-auto my-0">
            <div className="border-b-[1px] border-b-[#ddd] h-[110px]">
                <nav className="w-[1200px] h-full mx-auto my-0 flex items-center justify-between">
                    <h1>
                        <Link to={'/'}>
                            <img src={logo} alt="로고" />
                        </Link>
                    </h1>

                    <form className="relative">
                        <input 
                            className="w-[478px] h-[43px] border-b-[2px] border-b-[#E71A0F] pl-[20px] text-[18px] outline-none"
                            type="text"     
                        />
                        <button className="absolute top-[50%] right-[0] transform translate-y-[-50%] w-[40px] h-[40px] flex items-center justify-center">
                            <img src={searchIco} alt="검색버튼" />
                        </button>
                    </form>

                    <div className="flex items-center justify-end w-[280px]">
                        {isLogged ? 
                            <Link 
                                to={'/MyPage'} 
                                className='mr-[10px] text-[13px] text-center text-[#8b8b8b] mt-[5px]'
                            >
                                <img src={myShoppingIco} alt="마이페이지" className="mx-auto my-0" />
                                <p className="text-[13px] text-center text-[#8b8b8b] mt-[5px]">마이페이지</p>
                            </Link> : ''
                        }
                        <button 
                            onClick={handleLogout}
                            className='mr-[10px]'
                        >
                            <img src={loginIco} alt="로그인 로그아웃" className="mx-auto my-0" />
                            <p className="text-[13px] text-center text-[#8b8b8b] mt-[5px]">
                                {!isLogged ? '로그인' : '로그아웃'}
                            </p>
                        </button>
                        <Link 
                            to={'/Cart'}
                            className="text-center mr-[10px]"
                        >
                            <img src={cartIco} alt="장바구니" className="mx-auto my-0" />
                            <p className="text-[13px] text-center text-[#8b8b8b] mt-[5px]">장바구니</p>
                        </Link>
                        <Link 
                            to={'/MyShopping'}
                            className="text-center"
                        >
                            <img src={myShoppingIco} alt="마이 쇼핑" className="mx-auto my-0" />
                            <p className="text-[13px] text-center text-[#8b8b8b] mt-[5px]">마이 쇼핑</p>
                        </Link>
                    </div>
                </nav>
            </div>

            <div className="h-[50px]">
                <nav className="flex items-center justify-between h-full w-[1200px] mx-auto my-0">
                    <div className="flex items-center">
                        <button className="bg-[#1d1d1d] w-[180px] h-full flex justify-center items-center text-[#fff] text-[16px]">
                            <img src={hamIco} alt="메뉴버튼" className="mr-[5px]" />
                            전체 카테고리
                        </button>

                        <div>
                            
                        </div>

                        <ul className="flex items-center pl-[10px] h-full">
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>AI 추천</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>베스트</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>특가</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>특산물</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>제철</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>꽃배달</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>전통시장</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>생활용품</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>헬스케어</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#363636]`}>군장병관</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <ul className="flex items-center">
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#118d32]`}>이벤트</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#118d32]`}>지역브랜드관</a>
                            </li>
                            <li>
                                <a href="#self" className={`${gnbItemStyle} text-[#118d32]`}>기획전</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;