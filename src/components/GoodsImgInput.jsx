import React from 'react';

const GoodsImgInput = ({onChange}) => {
    return (
        <div className='mb-[20px]'>
            <input 
                type='file'
                accept='image/*'
                onChange={onChange}
            />
        </div>
    );
};

export default GoodsImgInput;