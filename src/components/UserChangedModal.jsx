import React from 'react';
import useUserChanged from './useUserChanged';

const UserChangedModal = ({
        handleSubmitUserUpdate,
        handleChangedUserName,
        setUserChangedModal,
        userChangedName
}) => {
    
    return (
        <div className='bg-black bg-opacity-50 fixed top-[0] left-[0] w-[100%] h-[100vh]'>
            <div 
                className='modal w-[400px] h-[200px] bg-[#fff] flex flex-col justify-center items-center border fixed
                            top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform'
            >
                <form 
                    className='w-[100%] flex flex-col items-center justify-center'
                    onSubmit={handleSubmitUserUpdate}
                > 
                    <input 
                        className='border w-[80%] h-[40px] mb-[20px] pl-[20px]'
                        type="text"
                        value={userChangedName}
                        onChange={handleChangedUserName}
                    />
                    <div className='flex justify-center items-center'>
                        <button 
                            type='button'
                            className='p-[8px] w-[100px] bg-[#ddd] rounded-[40px] mr-[10px]'
                            onClick={() => setUserChangedModal(false)}
                        >
                            취소
                        </button>
                        <button className='p-[8px] w-[100px] bg-[#eee] rounded-[40px]'>확인</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserChangedModal;