import React from 'react';

const GoodsItems = ({
    image,
    productName,
    explanation,
    price,
    discount
}) => {
    const discounted = () => {
        const discoutingPrice = price - (price * (discount / 100));
        return discoutingPrice.toLocaleString();
    };

    return (
        <div className=''>
            <div className='w-full h-[390px] mb-[10px]'>
                <img src={image} alt={productName} className='h-full w-full' />
            </div>
            <p className='text-[20px] font-semibold mb-[10px]'>{productName}</p>
            <p className='text-[14px] text-[#666] mb-[10px]'>{explanation}</p>
            <span className='inline-block mr-[10px] text-[red]'>{discounted()}원</span>
            <span className='inline-block text-[14px] text-[#666] line-through'>{price.toLocaleString()}원</span>
        </div>
    );
};

export default GoodsItems;