import React, { useEffect, useState } from 'react';

const GoodsChangeModal = ({ id, setGoodsLists, setGoodsModal }) => {
    const [productName, setProductName] = useState('');
    const [explanation, setExplanation] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3005/products/${id}`);
                if (!res.ok) throw new Error('상품 불러오기 실패');
                const data = await res.json();

                setProductName(data.productName);
                setExplanation(data.explanation);
                setPrice(data.price);
                setDiscount(data.discount);
                setQuantity(data.quantity);
                setImageUrl(data.imageUrl);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProduct();
    }, [id]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            // 이미지 미리보기용 (선택한 파일 객체 URL)
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleUpdateGoods = async () => {
        try {
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('explanation', explanation);
            formData.append('price', price);
            formData.append('discount', discount);
            formData.append('quantity', quantity);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const res = await fetch(`http://localhost:5000/goods/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) {
                alert('제품 수정에 실패하였습니다.');
                return;
            }

            const updatedProduct = await res.json();

            setGoodsLists(prev =>
                prev.map(item => (item.id === id ? updatedProduct.product : item))
            );

            alert('제품이 수정되었습니다.');
            setGoodsModal(false);
        } catch (err) {
            console.error('제품 수정 오류:', err);
            alert('제품 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className='bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className='bg-white p-6 rounded w-[600px]'>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleUpdateGoods();
                    }}
                >
                    <div className='mb-4'>
                        <label>이미지</label>
                        <input type='file' accept='image/*' onChange={handleImageChange} />
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt='preview'
                                className='mt-2 max-h-40 object-contain'
                            />
                        )}
                    </div>
                    <input
                        className='border w-full mb-4 p-2'
                        type='text'
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        placeholder='제품명'
                        required
                    />
                    <textarea
                        className='border w-full mb-4 p-2'
                        value={explanation}
                        onChange={e => setExplanation(e.target.value)}
                        placeholder='설명'
                        rows={3}
                    />
                    <input
                        className='border w-full mb-4 p-2'
                        type='number'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder='가격'
                        required
                    />
                    <input
                        className='border w-full mb-4 p-2'
                        type='number'
                        value={discount}
                        onChange={e => setDiscount(e.target.value)}
                        placeholder='할인율'
                    />
                    <input
                        className='border w-full mb-4 p-2'
                        type='number'
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        placeholder='수량'
                        required
                    />

                    <div className='flex justify-end gap-4'>
                        <button
                            type='button'
                            className='px-4 py-2 bg-gray-300 rounded'
                            onClick={() => setGoodsModal(false)}
                        >
                            취소
                        </button>
                        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GoodsChangeModal;
