import React, { useState } from 'react';
import ModalPortal from './portal/ModalPortal';
import GoodsChangeModal from './GoodsChangeModal';
import useGoodsUi from './useGoodsUi';

const GoodsManagementItems = ({
    image,
    productName,
    explanation,
    price,
    discount,
    quantity,
    handleDelete,
    id
}) => {
    const [goodsModal, setGoodsModal] = useState(false);
    const { goodsLists, setGoodsLists} = useGoodsUi();


    const goodsChangeModalOpen = () => {
        setGoodsModal(true);
    };

    return (
        <div>
            <div className='w-full h-[390px] mb-[10px]'>
                <img src={image} alt={productName} className='h-full w-full' />
            </div>
            <p className='text-[20px] font-semibold mb-[10px]'>제품명 : {productName}</p>
            <p className='text-[14px] text-[#666] mb-[10px]'>간략 설명 : {explanation}</p>
            <p className='text-[#666] mb-[10px]'>할인율 : {discount}%</p>
            <p className='text-[red] mb-[10px]'>가격 : {price}원</p>
            <p className=''>재고수량 : {quantity}개</p>
            <button
                type='button'
                onClick={goodsChangeModalOpen}            
            >
                수정
            </button>
            <button 
                type='button'
                onClick={() => handleDelete(id)}
            >
                삭제
            </button>

            {
                goodsModal &&
                <ModalPortal>
                    <GoodsChangeModal 
                        id={id}
                        productNameValue={productName}
                        explanationValue={explanation}
                        priceValue={price}
                        discountValue={discount}
                        quantityValue={quantity}
                        setGoodsLists={setGoodsLists}
                    />
                </ModalPortal> 
            }
        </div>
    );
};

export default GoodsManagementItems;