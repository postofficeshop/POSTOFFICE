import React from 'react';

const GoodsItems = ({
    image,
    productName,
    explanation,
    price,
    discount,
    quantity
}) => {
    return (
        <div>
            <img src={image} alt={productName} />
            <p>{productName}</p>
            <p>{explanation}</p>
            <span>{price}</span>
            <span>{discount}</span>
            <p>{quantity}</p>
        </div>
    );
};

export default GoodsItems;