import React from 'react';
import computerIco from '../assets/images/imgi_21_login_wrap_bg_1.gif';
import kakaoLoginImg from '../assets/images/imgi_3_btn_login_kakao_sm.jpg';
import naverLoginImg from '../assets/images/imgi_4_btn_login_naver_sm.jpg';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const loginTabStyle = "flex items-center justify-center w-[calc(100%/3)] text-[18px] text-[#555] leading-[70px] border-t border-t-[#ddd] border-b border-b-[#999] border-l border-l-[#ddd]";
const loginTabActive = "border-b-[#fff] !border-t-[#999] !border-l-[#999] !border-r-[#999] text-[#1D1D1D] font-bold text-[22px]";
const inputStyle = "h-[40px] w-full border border-[#ddd] pl-[10px]";

const Login = () => { 
    //로그인 커스텀 훅
    const { 
        handleChangeId, 
        handleChangePassword, 
        userId, 
        userPassword,
        idInputRef,
        pwInputRef,
        handleChangeChecked,
        userIdChecked,
        handleSubmit
    } = useLogin();    

    return (
        <>
            <div className="w-[1200px] mx-auto my-0 pt-[20px] pb-[100px]">
                <h1 className="text-[30px] font-bold text-[#1D1D1D] pb-[10px] border-b-2 border-b-[#1D1D1D] mb-[30px]">로그인</h1>
                
                <div className="w-full flex items-center mb-[20px]">
                    <a href="#self" className={`${loginTabStyle} ${loginTabActive}`}>아이디 로그인</a>
                    <a href="#self" className={loginTabStyle}>공동인증서 로그인</a>
                    <a href="#self" className={`${loginTabStyle} border-r border-r-[#ddd]`}>간편인증서(민간인증서)</a>
                </div>

                <form action="" 
                    className="bg-[#f5f5f5] pt-[20px] pb-[20px]"
                    onSubmit={handleSubmit}
                >
                    <div className="w-[500px] mx-auto my-0">
                        <div className="flex justify-end mb-[20px]">
                            <input 
                                type="checkbox" 
                                id="save-id"
                                onChange={handleChangeChecked}
                                checked={userIdChecked}
                            />
                            <label htmlFor="save-id" className="text-[13px] ml-[5px]">아이디 저장</label>
                        </div>  

                        <div className="flex align-start">
                            <div className='mr-[30px]'>
                                <img src={computerIco} alt="컴퓨터 모양 아이콘" />
                            </div>
                            <div className='flex'>
                                <div className='w-[calc(100%-130px)] mr-[10px]'>
                                    <input 
                                        className={`${inputStyle} mb-[10px]`}
                                        placeholder='아이디'
                                        type="text"
                                        onChange={handleChangeId} 
                                        value={userId}
                                        ref={idInputRef}
                                    />
                                    <input 
                                        className={inputStyle}
                                        placeholder='비밀번호'
                                        type="password" 
                                        onChange={handleChangePassword}
                                        value={userPassword}
                                        ref={pwInputRef}
                                    />
                                </div>
                                <button
                                    className='w-[120px] h-[90px] bg-[#EE2E24] text-[#fff]'
                                >
                                    로그인
                                </button>
                            </div>
                        </div>

                        <div className='flex pl-[79.5px] mt-[10px]'>
                            <Link to={'/Join'} className='mr-[5px] w-[40%] h-[30px] border flex items-center justify-center bg-[#fff] text-[14px] text-[#EE2E24]'>
                                회원가입
                            </Link>
                            <Link to={'/Join'} className='mr-[5px] w-[30%] h-[30px] border flex items-center justify-center bg-[#fff] text-[14px]'>
                                아이디 찾기
                            </Link>
                            <Link to={'/Join'} className='w-[30%] h-[30px] border flex items-center justify-center bg-[#fff] text-[14px]'>
                                비밀번호 찾기
                            </Link>
                        </div>
                        <p className='text-[14px] mt-[10px] pl-[79.5px]'>
                            ※ 1시간 동안 이용이 없으면 <span className='text-[#EE2E24]'>자동 로그아웃</span> 됩니다. <br />
                            ※ [카카오/네이버로 시작하기] 로그인은 <span className='text-[#EE2E24]'>개인회원만 이용 가능</span> 합니다.
                        </p>
                        <div className='flex pl-[79.5px] mt-[10px]'>
                            <a href="#self" className='mr-[5px] block'>
                                <img src={kakaoLoginImg} alt="카카오 로그인" />
                            </a>
                            <a href="#self" className='block'>
                                <img src={naverLoginImg} alt="네이버 로그인" />
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;