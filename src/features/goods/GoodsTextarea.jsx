import React from 'react';

const GoodsTextarea = ({
    goodsState,
    onChange
}) => {
    return (
        <div>
            <label className='mb-[10px] block'>간략 설명</label>
            <textarea 
                className='mb-[20px] block w-full h-[100px] border' 
                style={{ 'resize' : 'none',  'overflow' : 'auto' }}
                value={goodsState}
                onChange={onChange}
            >
            </textarea>
        </div>
    );
};

export default GoodsTextarea;