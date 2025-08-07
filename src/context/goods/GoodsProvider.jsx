import React, { useState, useEffect, useCallback } from 'react';
import { GoodsContext } from './GoodsContext';

const GoodsProvider = ({ children }) => {
    const [goodsLists, setGoodsLists] = useState([]);
    const [goodsState, setGoodsState] = useState({
        productName: '',
        explanation: '',
        price: '',
        discount: '',
        quantity: '',
        image: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGoods = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/goods');
            if (!res.ok) throw new Error('데이터 불러오기 실패');
            const data = await res.json();
            setGoodsLists(data.slice().reverse()); // 최신순 정렬
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGoods();
    }, [fetchGoods]);

    const handleInputChange = (key, value) => {
        setGoodsState(prev => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (file) => {
        setGoodsState(prev => ({ ...prev, image: file }));
    };

    const handleAddGoods = async (e) => {
        e.preventDefault();
        if (!goodsState.productName) {
            alert('상품명을 입력하세요');
            return;
        }

        try {
            const formData = new FormData();
                formData.append('productName', goodsState.productName);
                formData.append('explanation', goodsState.explanation);
                formData.append('price', goodsState.price);
                formData.append('discount', goodsState.discount);
                formData.append('quantity', goodsState.quantity);
            if (goodsState.image) {
                formData.append('image', goodsState.image);
            }

            const res = await fetch('http://localhost:5000/goods', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                if (res.status === 400) {
                    const errData = await res.json();
                    alert(errData.message || '이미 등록된 상품입니다.');
                } else {
                    throw new Error('상품 등록 실패');
                }
                return;
            }

            const result = await res.json();

            alert('상품 등록이 완료되었습니다.');

            setGoodsLists(prev => [result.product, ...prev]);

            setGoodsState({
                productName: '',
                explanation: '',
                price: '',
                discount: '',
                quantity: '',
                image: null,
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <GoodsContext.Provider
            value={{
                goodsLists,
                loading,
                error,
                fetchGoods,
                goodsState,
                setGoodsLists,
                handleInputChange,
                handleImageChange,
                handleAddGoods,
            }}
        >
            {children}
        </GoodsContext.Provider>
    );
};

export default GoodsProvider;
