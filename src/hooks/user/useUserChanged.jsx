import React, { useState } from 'react';
import useAuth from '../login/useAuth';

const useUserChanged = () => {
    const {isLogged, setUser} = useAuth();
    const [userChangedModal, setUserChangedModal] = useState(false);
    const [myPageName, setMyPageName] = useState('');
    const [myPageId, setMyPageId] = useState('');
    const [userChangedName, setUserChangedName] = useState('');

    const fetchUserData = async () => {
        try {
            const res = await fetch('http://localhost:4000/me', {
                method: 'GET',
                credentials: 'include' //쿠키 허용
            });

            if(!res.ok) {
                throw new Error('데이터 요청 실패');
            }

            const data = await res.json();
            console.log('데이터 요청 성공', data);
            setMyPageName(data.user.name);
            setMyPageId(data.user.id);
            setUserChangedName(data.user.name);
        } catch(err) {
            console.error('데이터 요청 실패', err);
        };
    };

    const handleChangedUserName = (e) => {
        setUserChangedName(e.target.value);
    };

    const userUpdate = async () => {
        console.log('userUpdate 함수 실행됨');
        try{
            const res = await fetch('http://localhost:4000/user', {
                method: 'PATCH',
                credentials: 'include', //쿠키 허용
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: userChangedName})
            });

            if(!res.ok) {
                throw new Error('변경 실패');
            }

            const data = await res.json();
            console.log('업데이트 결과', data);
            setUser(prev => ({...prev, name: userChangedName}));

            setMyPageName(data.user.name);
        } catch(err) {
            console.error('업데이트 실패', err);
        };
    };

    const handleSubmitUserUpdate =  (e) => {
        e.preventDefault();
        userUpdate();
        setMyPageName(userChangedName);

        setUserChangedModal(false);
    };

    const handleOpenModal = () => {
        setUserChangedModal(true);
    };

    return {
        fetchUserData,
        userChangedModal,
        myPageName,
        myPageId,
        userChangedName,
        handleChangedUserName,
        handleSubmitUserUpdate,
        handleOpenModal,
        setUserChangedModal
    }
};

export default useUserChanged;