import React, { useEffect, useRef, useState } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState(''); 
    const [userIdChecked, setUserIdChecked] = useState(false);
    const idInputRef = useRef();
    const pwInputRef = useRef();

    //로그인 커스텀 훅
    const { login, setIsLogged } = useAuth();

    //아이디 저장
    useEffect(() => {
        const savedId = localStorage.getItem('userSavedId');
        if(savedId) {
            setUserId(savedId);
            setUserIdChecked(true);
        }
    }, []);
    
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChangeId = (e) => {
        setUserId(e.target.value);
    };

    const handleChangePassword = (e) => {
        setUserPassword(e.target.value)
    };

    const handleChangeChecked = (e) => {
        setUserIdChecked(e.target.checked);
    };

    //로그인 로직
    const handleSubmit = async (e) => {
        e.preventDefault();

        const idRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const pwRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;

        //아이디 유효성 검사
        if(!idRegex.test(userId.trim())) {
            alert('아이디가 올바르지 않습니다. abc@abc 형식');
            idInputRef.current.focus();
            return;
        }

        //패스워드 유효성 검사
        if(!pwRegex.test(userPassword.trim())) {
            alert('비밀번호가 올바르지 않습니다. 영문 소문자 + 숫자 총 8자 이상');
            pwInputRef.current.focus();
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/login', {
                method: 'POST',
                credentials: 'include', //쿠키 허용
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: userId, password: userPassword}) //유저의 아이디와 비빌번호 POST
            });
            
            const data = await res.json();

            if(!res.ok) {
                alert(data.message);
                setMessage(data.message);
                return;
            };

            setMessage(`${data.name} / ${data.id}, 로그인 성공`);

            const userData = {id: data.id, name: data.name};

            login(userData);
            setIsLogged(true);

            //checked = true일시 아이디 저장
            if(userIdChecked) {
                localStorage.setItem('userSavedId', userId);
            } else {
                localStorage.removeItem('userSavedId');
            }

            alert('환영합니다!');
            navigate('/'); //로그인 성공

        } catch(err) {
            setMessage('오류 발생');
            console.error(err, "오류 발생");
        }
    };

    return {
        handleChangeId, 
        handleChangePassword, 
        userId,
        setUserId, 
        userPassword,
        idInputRef,
        pwInputRef,
        handleChangeChecked,
        userIdChecked,
        setUserIdChecked,
        handleSubmit,
    };
};

export default useLogin;