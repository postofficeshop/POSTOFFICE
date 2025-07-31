import React, { useContext, useRef } from 'react';
import { GoodsContext } from '../../context/goods/GoodsContext';
import GoodsImgInput from '../../features/goods/GoodsImgInput';
import GoodsInput from '../../features/goods/GoodsInput';
import GoodsTextarea from '../../features/goods/GoodsTextarea';
import GoodsManagementItems from '../../features/goods/GoodsManagementItems';

const inputStyle = 'block w-full h-[50px] border mb-[20px] pl-[20px]';
const numberInputStyle = 'pl-[20px] h-[30px] mb-[20px] border';

const GoodsRegistration = () => {
    const {
        goodsLists,
        goodsState,
        handleInputChange,
        handleImageChange,
        handleAddGoods,
    } = useContext(GoodsContext);

    console.log(goodsState)

    const imageInputRef = useRef(null);

    const changeImageInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleImageChange(e.target.files[0]);
        }
    };

    const ChangeProductNameInput = (e) => {
        handleInputChange('productName', e.target.value);
    };

    const ChangeExplanationInput = (e) => {
        handleInputChange('explanation', e.target.value);
    };

    const ChangePriceInput = (e) => {
        handleInputChange('price', e.target.value);
    };

    const ChangeDiscountInput = (e) => {
        handleInputChange('discount', e.target.value);
    };

    const ChangeQuantityInput = (e) => {
        handleInputChange('quantity', e.target.value);
    };

    return (
        <div className='w-[1200px] mx-auto my-0 pt-[20px] pb-[100px]'>
            <form 
                className='w-[600px] p-[30px] border mx-auto my-0 mb-[40px]'
                onSubmit={handleAddGoods}
            >
                <GoodsImgInput 
                    onChange={changeImageInput}
                    imageInputRef={imageInputRef}
                />
                <GoodsInput 
                    type='text'
                    placeholder='제품명을 입력하세요'
                    inputStyle={inputStyle}
                    label='제품명'
                    goodsState={goodsState.productName}
                    onChange={ChangeProductNameInput}
                />
                <GoodsTextarea 
                    goodsState={goodsState.explanation}
                    onChange={ChangeExplanationInput}
                />
                <GoodsInput 
                    type='number'
                    placeholder='가격을 입력하세요'
                    inputStyle={numberInputStyle}
                    label='가격'
                    goodsState={goodsState.price}
                    onChange={ChangePriceInput}
                />
                <GoodsInput 
                    type='number'
                    placeholder='할인율을 입력하세요'
                    inputStyle={numberInputStyle}
                    label='할인율'
                    goodsState={goodsState.discount}
                    onChange={ChangeDiscountInput}
                />
                <GoodsInput 
                    type='number'
                    placeholder='수량을 입력하세요'
                    inputStyle={numberInputStyle}
                    label='수량'
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
            <div className='grid grid-cols-3 gap-[15px] gap-y-[40px] mt-[50px]'>
                {goodsLists.map((item) => (
                    <div key={item.id}>
                        <GoodsManagementItems 
                            image={item.imageUrl}
                            productName={item.productName}
                            explanation={item.explanation}
                            price={item.price}
                            discount={item.discount}
                            quantity={item.quantity}
                            id={item.id}
                            handleUpdateGoods={() => handleUpdateGoods(item.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoodsRegistration;
