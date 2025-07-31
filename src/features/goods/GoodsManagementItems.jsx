import React, { useContext, useState } from 'react';
import ModalPortal from '../../components/portal/ModalPortal';
import GoodsChangeModal from './GoodsChangeModal';
import { GoodsContext } from '../../context/goods/GoodsContext';

const GoodsManagementItems = ({
    image,
    productName,
    explanation,
    price,
    discount,
    quantity,
    id
}) => {
    const [goodsModal, setGoodsModal] = useState(false);
    const { setGoodsLists } = useContext(GoodsContext);

    const goodsChangeModalOpen = () => {
        setGoodsModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            const res = await fetch(`http://localhost:5000/goods/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                alert('상품 삭제에 실패했습니다.');
                return;
            }

            setGoodsLists(prev => prev.filter(item => item.id !== id));
            alert('상품이 삭제되었습니다.');
        } catch (err) {
            console.error('상품 삭제 오류:', err);
            alert('상품 삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <div className='w-full h-[390px] mb-[10px]'>
                <img src={image} alt={productName} className='h-full w-full' />
            </div>
            <p className='text-[20px] font-semibold mb-[10px]'>제품명 : {productName}</p>
            <p className='text-[14px] text-[#666] mb-[10px]'>간략 설명 : {explanation}</p>
            <p className='text-[#666] mb-[10px]'>할인율 : {discount}%</p>
            <p className='text-[red] mb-[10px]'>가격 : {price.toLocaleString()}원</p>
            <p className=''>재고수량 : {quantity.toLocaleString()}개</p>
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
                        setGoodsModal={setGoodsModal}
                    />
                </ModalPortal> 
            }
        </div>
    );
};

export default GoodsManagementItems;
