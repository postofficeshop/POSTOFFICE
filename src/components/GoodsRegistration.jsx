import React, { useCallback, useReducer, useState } from 'react';
import GoodsInput from './GoodsInput';
import GoodsTextarea from './GoodsTextarea';
import GoodsImgInput from './GoodsImgInput';

const inputStyle = 'block w-full h-[50px] border mb-[20px] pl-[20px]';
const numberInputStyle = 'pl-[20px] h-[30px] mb-[20px] border';

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
        default: 
            return state;
    }
}

const GoodsRegistration = () => {
    const [goodsImg, setGoodsImg] = useState(null);
    const [goodsState, dispatch] = useReducer(reducer, initialValue);

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
        console.log('이미지 업로드');
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

    const handleUploadGoods = async (e) => {
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
    } else {
        alert('상품 등록에 실패했습니다. 중복된 상품명일 수 있습니다.');
    }
};

    
    return (
        <div className='w-[1200px] mx-auto my-0 pt-[20px] pb-[100px]'>
            <form 
                className='w-[600px] p-[30px] border mx-auto my-0'
                onSubmit={handleUploadGoods}
            >
                <GoodsImgInput 
                    onChange={changeImageInput}
                />
                <GoodsInput 
                    type={'text'}
                    placeholder={'제품명을 입력하세요'}
                    inputStyle={inputStyle}
                    label={'제품명'}
                    goodsState={goodsState.productName}
                    onChange={ChangeProductNameInput}
                />
                <GoodsTextarea 
                    goodsState={goodsState.explanation}
                    onChange={ChangeExplanationInput}
                />
                <GoodsInput 
                    type={'number'}
                    placeholder={'가격을 입력하세요'}
                    inputStyle={numberInputStyle}
                    label={'가격'}
                    goodsState={goodsState.price}
                    onChange={ChangePriceInput}
                />
                <GoodsInput 
                    type={'number'}
                    placeholder={'할인율을 입력하세요'}
                    inputStyle={numberInputStyle}
                    label={'할인율'}
                    goodsState={goodsState.discount}
                    onChange={ChangeDiscountInput}
                />
                <GoodsInput 
                    type={'number'}
                    placeholder={'수량을 입력하세요'}
                    inputStyle={numberInputStyle}
                    label={'수량'}
                    goodsState={goodsState.quantity}
                    onChange={ChangeQuantityInput}
                />
                <button
                    className='w-[120px] h-[40px] bg-[#ddd] flex items-center justify-center rounded-[40px] mx-auto'
                >
                    등록
                </button>
            </form>
        </div>
    );
};

export default GoodsRegistration;