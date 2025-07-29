    import React, { useEffect, useState } from 'react';
    import GoodsImgInput from './GoodsImgInput';
    import useGoodsUi from './useGoodsUi';

    const GoodsChangeModal = ({id, setGoodsLists}) => {
        const [productName, setProductName] = useState('');
        const [explanation, setExplanation] = useState('');
        const [price, setPrice] = useState('');
        const [discount, setDiscount] = useState('');
        const [quantity, setQuantity] = useState('');
        const [imageUrl, setImageUrl] = useState('');

        // const {goodsLists, setGoodsLists} = useGoodsUi();

        useEffect(() => {
            const goodsGetFetch = async () => {
                try{
                    const res = await fetch(`http://localhost:3005/products/${id}`, {
                        method: 'GET'
                    });

                    if(!res.ok) {
                        console.error('상품 불러오기 실패하였습니다.');
                        return false;
                    }

                    console.log('상품 불러오기 성공');
                    const data = await res.json();

                    setProductName(data.productName);
                    setExplanation(data.explanation);
                    setPrice(data.price);
                    setDiscount(data.discount);
                    setQuantity(data.quantity);
                    setImageUrl(data.imageUrl);

                } catch(err) {
                    console.error('상품 불러오기 실패')
                };
            };

            goodsGetFetch();
        }, [id])

        const handleUpdateGoods = async (id) => {
            try{
                const res = await fetch(`http://localhost:3005/products/${id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({ productName, explanation, price, discount, quantity, imageUrl })
                });

                if(!res.ok) {
                    console.error('제품 수정 실패');
                    alert('제품 수정에 실패하였습니다.');
                    return;
                }

                setGoodsLists((prev) =>
                    prev.map(item =>
                        item.id === id
                        ? { ...item, productName, explanation, price, discount, quantity, imageUrl }
                        : item
                    )
                );
                
                alert('제품이 수정되었습니다.'); 
            }catch(err) {
                console.error('제품 수정 오류');
                return false;
            };
        };

        const handleClickGoodsChanged = async () => {
            await handleUpdateGoods(id);
        }

        return (
            <div className='bg-black bg-opacity-50 fixed top-[0] left-[0] w-[100%] h-[100vh]'>
                <div 
                    className='modal w-[600px] bg-[#fff] flex flex-col justify-center items-center border fixed
                                top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform'
                >
                    <form 
                        className='w-[100%] flex flex-col items-center justify-center p-[30px]'
                    > 
                        <input 
                            type='file'
                            accept='image/*'
                            onChange={(e) => {setImageUrl(e.target.files[0])}}
                        />
                        <input 
                            className='border w-[80%] h-[40px] mb-[20px] pl-[20px]'
                            type="text"
                            value={productName}
                            onChange={(e) => {setProductName(e.target.value)}}
                        />
                        <textarea 
                            className='border w-[80%] h-[40px] mb-[20px] pl-[20px]'
                            type="text"
                            value={explanation}
                            onChange={(e) => {setExplanation(e.target.value)}}
                        />
                        <input 
                            className='border w-[80%] h-[40px] mb-[20px] pl-[20px]'
                            type="number"
                            value={discount}
                            onChange={(e) => {setDiscount(Number(e.target.value))}}
                        />
                        <input 
                            className='border w-[80%] h-[40px] mb-[20px] pl-[20px]'
                            type="number"
                            value={price}
                            onChange={(e) => {setPrice(Number(e.target.value))}}
                        />
                        <input 
                            className='border w-[80%] h-[40px] mb-[20px] pl-[20px]'
                            type="number"
                            value={quantity}
                            onChange={(e) => {setQuantity(Number(e.target.value))}}
                        />

                        <div className='flex justify-center items-center'>
                            <button 
                                type='button'
                                className='p-[8px] w-[100px] bg-[#ddd] rounded-[40px] mr-[10px]'
                            >
                                취소
                            </button>
                            <button
                                type='button'
                                className='p-[8px] w-[100px] bg-[#eee] rounded-[40px]'
                                onClick={handleClickGoodsChanged}
                            >
                                확인
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default GoodsChangeModal;