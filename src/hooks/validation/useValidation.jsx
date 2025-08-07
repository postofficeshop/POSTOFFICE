import React from 'react';

const useValidation = () => {
    const idRegex = /^[a-z0-9]{5,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;

    const nameRegex = /^[가-힣]{2,10}$/;
    const emailRegex = /^[a-z0-9]+@(naver|gmail)\.com$/;

    const birthRegex = /^(?:[0-9]{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])$/;
    const phoneRegex = /^010-?\d{4}-?\d{4}$/;

    return {idRegex, passwordRegex, nameRegex, emailRegex, birthRegex, phoneRegex}
};

export default useValidation;