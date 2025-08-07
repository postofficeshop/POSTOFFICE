import React, { useEffect, useState } from 'react';

const useGoodsUi = () => {
    const [goodsLists, setGoodsLists] = useState([]);

    const goodsUiFetch = async () => {
        try{
            const res = await fetch('http://localhost:5000/goods', {
                method: 'GET'
            });

            if(!res.ok) {
                const errorData = await res.json();
                console.error(errorData.message);
                return errorData;
            }

            const data = await res.json();
            setGoodsLists(data.goods.reverse());
        }catch(err) {
            console.error(errorData.message, err);
        };
    };

    useEffect(() => {
        goodsUiFetch();
    }, []);

    return {goodsLists, goodsUiFetch, setGoodsLists};
};

export default useGoodsUi