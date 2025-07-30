import React from 'react';

const GoodsImgInput = ({onChange, imageInputRef}) => {
    return (
        <div className='mb-[20px]'>
            <input 
                type='file'
                accept='image/*'
                onChange={onChange}
                ref={imageInputRef}
            />
        </div>
    );
};

export default GoodsImgInput;