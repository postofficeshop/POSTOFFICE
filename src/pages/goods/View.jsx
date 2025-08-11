import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
    const { id } = useParams();
    const [view, setView] = useState(null);

    useEffect(() => {
        const viewFetch = async () => {
            try{
                const res = await fetch(`http://localhost:5000/goods?id=${id}`, {
                    method:'GET'
                });

                if(!res.ok) {
                    console.log('상세페이지 조회 실패');
                    return false;
                }

                const data = await res.json();
                const foundData = data.find(item => item.id === id);
                setView(foundData);
                return true;
            } catch(err) {
                console.error('서버오류', err);
                return false;
            };
        };

        viewFetch();
    }, [id]);

    const discounted = () => {
        const discoutingPrice = view.price - (view.price * (view.discount / 100));
        return discoutingPrice.toLocaleString();
    };

    if (!view) {
        return <p className="text-center mt-20 text-gray-500">로딩 중이거나 데이터가 없습니다.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto my-20 px-4 flex flex-col md:flex-row gap-10">
            <figure className="md:w-1/2 w-full">
                <img src={view.imageUrl} alt={view.productName} className="w-full h-auto rounded-lg shadow-md" />
            </figure>
            <div className="md:w-1/2 w-full flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-4">{view.productName}</h1>
                <p className="text-gray-700 mb-6">{view.explanation}</p>
                <div className="text-xl font-semibold mb-2">
                    가격: <span className="text-red-600">{discounted()}원</span>
                </div>
                <div className="text-lg text-gray-600">
                    할인: <span className="text-green-600">{view.discount}%</span>
                </div>
            </div>
        </div>
    );
};

export default View;
