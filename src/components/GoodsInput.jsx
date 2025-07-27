import React from 'react';

const GoodsInput = ({
    type,
    placeholder,
    inputStyle,
    label,
    goodsState,
    onChange
}) => {
    return (
        <div>
            <label className='mb-[10px] block'>{label}</label>
            <input 
                className={inputStyle}
                type={type}
                placeholder={placeholder}
                value={goodsState}
                onChange={onChange}
            />
        </div>
    );
};

export default GoodsInput;