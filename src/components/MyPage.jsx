import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import ModalPortal from './portal/ModalPortal';
import UserChangedModal from './UserChangedModal';
import useUserChanged from './useUserChanged';

const MyPage = () => {
    const {isLogged} = useAuth();
    const {
        fetchUserData,
        userChangedModal,
        myPageName,
        myPageId,
        handleOpenModal,
        handleSubmitUserUpdate,
        handleChangedUserName,
        setUserChangedModal,
        userChangedName
    } = useUserChanged();

    useEffect(() => {
        if(!isLogged) return;
        fetchUserData();
    }, [isLogged]);

    return (
        <div className='w-[1200px] mx-auto my-0 pt-[20px] pb-[100px] relative'>
            <h1 className="text-[30px] font-bold text-[#1D1D1D] pb-[10px] border-b-2 border-b-[#1D1D1D] mb-[30px]">마이페이지</h1>
            <p className='text-[30px] text-center'>NAME : {myPageName}</p>
            <p className='text-[30px] text-center'>ID : {myPageId}</p>
            <button 
                className='p-[10px] bg-[#ddd] rounded-[40px] mt-[20px] mx-auto block'
                onClick={handleOpenModal}
            >
                회원정보 수정
            </button>

            {/* 장바구니 목록 추가 예정 */}

            {/* 모달창 */}
            {
                userChangedModal &&
                <ModalPortal>
                    <UserChangedModal 
                        handleSubmitUserUpdate={handleSubmitUserUpdate}
                        handleChangedUserName={handleChangedUserName}
                        setUserChangedModal={setUserChangedModal}
                        userChangedName={userChangedName}
                    />
                </ModalPortal>
            }
        </div>
    );
};

export default MyPage;
