const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const JSON_SERVER_URL = 'http://localhost:3005';

//상품 등록
app.post('/goods', async (req, res) => {
    console.log('물품 등록 서버 실행');
    const id = uuidv4();
    const {productName, explanation, price, discount, quantity, imageUrl} = req.body;

    try{
        //상품 중복 검사
        const checkResProductName = await fetch(`${JSON_SERVER_URL}/products?productName=${productName}`);
        const existingProductName = await checkResProductName.json();
        if(existingProductName.length > 0) {
            return res.status(400).json({ message: '이미 등록된 상품입니다' });
        }
        
        const productsRes = await fetch(`${JSON_SERVER_URL}/products`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, productName, explanation, price, discount, quantity, imageUrl })
        });

        if(!productsRes.ok) {
            console.error('상품 등록 실패');
            return res.status(500).json({ message: '상품등록에 실패하였습니다.' });
        }

        console.log('상품 등록 성공');
        const newProducts = await productsRes.json();
        console.log(newProducts);
        res.status(201).json({ message: '상품이 등록되었습니다.', newProducts })
    } catch(err) {
        console.error('상품 등록 서버 오류', err);
        return res.status(500).json({ message: '서버 오류' });
    };
});

//이미지 정적 폴더 등록
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

//업로드 라우터 추가
app.post('/uploads', upload.single('image'), (req, res) => {
    if(!req.file) {
        return res.status(400).json({ message: '파일 없음' });
    }

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

app.get('/goods', async (req, res) => {
    console.log('상품 리스트 출력');
    
    try{
        const goodsRes = await fetch(`${JSON_SERVER_URL}/products`, {
            method: 'GET',
        });

        if(!goodsRes.ok) {
            console.error('상품을 불러오지 못했습니다.');
            return res.status(401).json({ message: '상품을 불러오지 못했습니다' });
        }

        console.log('상품 불러오기 성공');
        const goodsData = await goodsRes.json();
        res.status(201).json({ message: '상품 불러오기 성공하였습니다.', goods: goodsData }); 
        console.log(goodsData);
    }catch(err) {
        console.error('상품 불러오기 서버 오류', err);
        return res.status(500).json({ message: '상품 불러오기 서버 오류' });
    };
}); 

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} 실행 중`);
});

