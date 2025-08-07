import React, { useReducer } from 'react';
import useValidation from '../validation/useValidation';

const initValue = {
    name: '',
    phone: '',
    birthDate: '',
    email: '',
    id: '',
    password: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'NAME':
            return {...state, name: action.payload}
        case 'PHONE':
            return {...state, phone: action.payload}
        case 'BIRTH':
            return {...state, birthDate: action.payload}
        case 'EMAIL':
            return {...state, email: action.payload}
        case 'ID': 
            return {...state, id: action.payload}
        case 'PASSWORD':
            return {...state, password: action.payload}
        default:
            return state
    };
};

const useSignUp = () => {
    const [signUpState, dispatch] = useReducer(reducer, initValue);
    const {idRegex, passwordRegex, nameRegex, emailRegex, birthRegex, phoneRegex} = useValidation();

    const sighUpFetch = async () => {
        //이름 유효성 검사
        if(!nameRegex.test(signUpState.name.trim())) {
            return alert('유효하지 않은 이름입니다. 한글 2 - 10자');
        };

        //연락처 유효성 검사
        if(!phoneRegex.test(signUpState.phone.trim())) {
            return alert('유효하지 않은 전화번호입니다. ex) 010-0000-0000');
        };

        //생년월일 유효성 검사
        if(!birthRegex.test(signUpState.birthDate.trim())) {
            return alert('유효하지 않은 생년월일입니다. ex) ex) YYMMDD');
        };

        //이메일 유효성 검사
        if(!emailRegex.test(signUpState.email.trim())) {
            return alert('유효하지 않은 이메일입니다. ex) abc@abc');
        };

        //아이디 유효성 검사
        if(!idRegex.test(signUpState.id.trim())) {
            return alert('유효하지 않은 아이디입니다. 영문 + 숫자, 5 - 12자');
        };

        //비밀번호 유효성 검사
        if(!passwordRegex.test(signUpState.password.trim())) {
            return alert('유효하지 않은 비밀번호입니다. 영문자 1개 이상 + 숫자 1개 이상 전체 8자 이상');
        };

        try {
            const res = await fetch('http://localhost:4000/join', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ 
                                        name: signUpState.name,
                                        phone: signUpState.phone,
                                        birthDate: signUpState.birthDate,
                                        email: signUpState.email,
                                        id: signUpState.id,
                                        password: signUpState.password
                                    })
            });
            
            const data = await res.json();

            if(!res.ok) {
                console.error('회원가입 데이터 전송 오류', data.message)
                alert(`${data.message}`);
                return;
            };

            console.log('회원가입 성공', data.message);
            alert(`${data.message} ${signUpState.name}, ${signUpState.id}`)
            
        } catch(err) {
            console.error('회원가입 서버 오류', err);
            return;
        };
    };

    const handleSignUpSuccess = (e) => {
        e.preventDefault();
        sighUpFetch();
    };

    return {signUpState, dispatch, sighUpFetch, handleSignUpSuccess};
};

export default useSignUp;