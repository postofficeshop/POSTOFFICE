import React from 'react';
import { Link } from 'react-router-dom';
import useSignUp from '../hooks/signUp/useSignUp';

const SignUp = () => {
    const {signUpState, dispatch, handleSignUpSuccess} = useSignUp();

    return (
        <>
            <div className="w-[1200px] mx-auto my-0 pt-[20px] pb-[100px]">
                <h1 className="text-[30px] font-bold text-[#1D1D1D] pb-[10px] border-b-2 border-b-[#1D1D1D] mb-[30px]">회원가입</h1>

                <form 
                    className='w-[600px] mx-auto my-0 border p-8 rounded-3xl shadow'
                    onSubmit={handleSignUpSuccess}
                >
                    <label className='block mb-3'>이름</label>
                    <input
                        className='block border w-full h-10 pl-[10px] mb-8'  
                        type="text" 
                        placeholder='이름을 입력해주세요.'
                        value={signUpState.name}
                        onChange={(e) => {dispatch({ type: 'NAME', payload: e.target.value })}}
                    />

                    <label className='block mb-3'>연락처</label>
                    <input
                        className='block border w-full h-10 pl-[10px] mb-8'  
                        type="text" 
                        placeholder='ex) 010-0000-0000'
                        value={signUpState.phone}
                        onChange={(e) => {dispatch({ type: 'PHONE', payload: e.target.value })}}
                    />

                    <label className='block mb-3'>생년월일</label>
                    <input
                        className='block border w-full h-10 pl-[10px] mb-8'  
                        type="text"
                        placeholder='ex) 생년월일 6자리'
                        value={signUpState.birthDate}
                        onChange={(e) => {dispatch({ type: 'BIRTH', payload: e.target.value })}}
                    />

                    <label className='block mb-3'>이메일</label>
                    <input
                        className='block border w-full h-10 pl-[10px] mb-8'  
                        type="text"
                        placeholder='ex) abc@abc' 
                        value={signUpState.email}
                        onChange={(e) => {dispatch({ type: 'EMAIL', payload: e.target.value })}}
                    />

                    <label className='block mb-3'>아이디</label>
                    <input
                        className='block border w-full h-10 pl-[10px] mb-8'  
                        type="text" 
                        placeholder='ex) abc123'
                        value={signUpState.id}
                        onChange={(e) => {dispatch({ type: 'ID', payload: e.target.value })}}
                    />

                    <label className='block mb-3'>패스워드</label>
                    <input
                        className='block border w-full h-10 pl-[10px] mb-8'  
                        type="password" 
                        placeholder='영문 + 숫자 8자리 이상'
                        value={signUpState.password}
                        onChange={(e) => {dispatch({ type: 'PASSWORD', payload: e.target.value })}}
                    />

                    <div className='flex justify-center'>
                        <button className='w-[120px] h-[40px] bg-[#ddd] rounded-full mr-4'>회원가입 완료</button>
                        <Link to={'/Login'} className='w-[120px] h-[40px] flex items-center justify-center bg-[#f5f5f5] rounded-full'>취소</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;