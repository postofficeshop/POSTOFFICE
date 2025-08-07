import React, { useCallback, useReducer, useRef, useState } from 'react';
//import useGoodsUi from './useGoodsUi';

const initialValue = {
    productName: '',
    explanation: '',
    price: '',
    discount: '',
    quantity: '' 
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'PRODUCT_NAME':
            return {...state, productName: action.payload};
        case 'EXPLANATION':
            return {...state, explanation: action.payload};
        case 'PRICE': 
            return {...state, price: action.payload};
        case 'DISCOUNT': 
            return {...state, discount: action.payload};
        case 'QUANTITY':
            return {...state, quantity: action.payload};
        case 'RESET_FORM':
            return initialValue
        default: 
            return state;
    }
}

const useGoods = () => {
    const [goodsImg, setGoodsImg] = useState(null);
    const [goodsState, dispatch] = useReducer(reducer, initialValue);
    const imageInputRef = useRef();

    const ChangeProductNameInput = useCallback((e) => {
        dispatch({ type: 'PRODUCT_NAME', payload: e.target.value });
    }, [dispatch]);
    
    const ChangeExplanationInput = useCallback((e) => {
        dispatch({ type: 'EXPLANATION', payload: e.target.value });
    }, [dispatch]);

    const ChangePriceInput = useCallback((e) => {
        dispatch({ type: 'PRICE', payload: Number(e.target.value) });
    }, [dispatch]);

    const ChangeDiscountInput = useCallback((e) => {
        dispatch({ type: 'DISCOUNT', payload: Number(e.target.value) });
    }, [dispatch]);

    const ChangeQuantityInput = useCallback((e) => {
        dispatch({ type: 'QUANTITY', payload: Number(e.target.value) });
    }, [dispatch]);
    
    const imageFetch = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try{
            const res = await fetch('http://localhost:5000/uploads', {
                method:'POST',
                body: formData,
                credentials: 'include'
            });

            if(!res.ok) {
                console.error('이미지 업로드 실패');
                alert('이미지 업로드에 실패하였습니다');
                return;
            }

            const data = await res.json();
            console.log('이미지 업로드 성공', data.imageUrl);
            return data.imageUrl;
        }catch(err) {
            console.error('이미지 업로드 서버 오류', err);
        }
    };

    const goodsFetch = async (imageUrl) => {
        try {
            const res = await fetch('http://localhost:5000/goods', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ 
                    productName: goodsState.productName,
                    explanation: goodsState.explanation,
                    price: goodsState.price,
                    discount: goodsState.discount,
                    quantity: goodsState.quantity,
                    imageUrl
                })
            });

            const data = await res.json();

            if(!res.ok) {
                console.error(data.message);
                return false;
            }

            return true;
        } catch (err) {
            console.error('서버 오류', err);
            return false;
        }
    };


    const changeImageInput = (e) => {
        setGoodsImg(e.target.files[0]);
    };

    const handleUploadGoods = async (e, goodsUiFetch) => {
        e.preventDefault();

        if(!goodsImg) {
            alert('이미지를 업로드 해주세요.');
            return;
        }

        if(!goodsState.productName || !goodsState.explanation || !goodsState.price || !goodsState.discount || !goodsState.quantity) {
            alert('전부 입력해주세요'); 
            return;
        };

        // 이미지 먼저 업로드
        const imageUrl = await imageFetch(goodsImg);
        if (!imageUrl) {
            alert('이미지 업로드 실패로 상품 등록을 중단합니다.');
            return;
        }

        // 상품 등록 시도
        const success = await goodsFetch(imageUrl);
        if(success) {
            alert('상품이 등록되었습니다');
            if(goodsUiFetch) {
                await goodsUiFetch();
            }
        } else {
            alert('이미 등록된 상품입니다.');
        }

        dispatch({ type: 'RESET_FORM' });
        setGoodsImg(null);
        if(imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    return {
        ChangeProductNameInput,
        ChangeExplanationInput,
        ChangePriceInput,
        ChangeDiscountInput,
        ChangeQuantityInput,
        changeImageInput,
        handleUploadGoods,
        goodsState,
        imageInputRef      
    }
};

export default useGoods;