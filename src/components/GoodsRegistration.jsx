import React, { useCallback, useReducer, useState } from 'react';
import GoodsInput from './GoodsInput';
import GoodsTextarea from './GoodsTextarea';
import GoodsImgInput from './GoodsImgInput';
import useGoods from './useGoods';
import useGoodsUi from './useGoodsUi';
import GoodsItems from './goodsItems';

const inputStyle = 'block w-full h-[50px] border mb-[20px] pl-[20px]';
const numberInputStyle = 'pl-[20px] h-[30px] mb-[20px] border';



const GoodsRegistration = () => {
    const {
        ChangeProductNameInput,
        ChangeExplanationInput,
        ChangePriceInput,
        ChangeDiscountInput,
        ChangeQuantityInput,
        changeImageInput,
        handleUploadGoods,
        goodsState,
        imageInputRef 
    } = useGoods();

    const {goodsLists, goodsUiFetch} = useGoodsUi();

    console.log(goodsLists);

    
    return (
        <div className='w-[1200px] mx-auto my-0 pt-[20px] pb-[100px]'>
            <form 
                className='w-[600px] p-[30px] border mx-auto my-0 mb-[40px]'
                onSubmit={(e) => {handleUploadGoods(e, goodsUiFetch)}}
            >
                <GoodsImgInput 
                    onChange={changeImageInput}
                    imageInputRef={imageInputRef}
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

            <h2 className='text-[30px] font-bold text-[#1D1D1D] pb-[10px] border-b-2 border-b-[#1D1D1D] mb-[30px]'>현재 등록된 상품</h2>

            <div className='grid grid-cols-3'>
                {goodsLists.map((item) => (
                    <GoodsItems 
                        key={item.id}
                        image={item.imageUrl}
                        productName={item.productName}
                        explanation={item.explanation}
                        price={item.price}
                        discount={item.discount}
                        quantity={item.quantity}
                    />
                ))}
            </div>
        </div>
    );
};

export default GoodsRegistration;