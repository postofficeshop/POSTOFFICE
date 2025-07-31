const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 5000;
const JSON_SERVER_URL = 'http://localhost:3005';

// uploads 폴더 없으면 생성
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// 정적 파일 서빙
app.use('/uploads', express.static(uploadsDir));

// CORS 설정
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, filename);
    }
});
const upload = multer({ storage });

// 상품 등록 (이미지 포함)
app.post('/goods', upload.single('image'), async (req, res) => {
    console.log('📦 [POST /goods] 호출됨');
    console.log('req.headers:', req.headers);
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const id = uuidv4();
    const { productName, explanation, price, discount, quantity } = req.body;

    const imageUrl = req.file
        ? `http://localhost:${PORT}/uploads/${req.file.filename}`
        : null;

    if (!productName || !imageUrl) {
        return res.status(400).json({ message: '상품명과 이미지가 필요합니다.' });
    }

    try {
        // 중복 상품명 체크
        const checkRes = await fetch(`${JSON_SERVER_URL}/products?productName=${encodeURIComponent(productName)}`);
        const existing = await checkRes.json();

        if (existing.length > 0) {
            return res.status(400).json({ message: '이미 등록된 상품입니다.' });
        }

        // 상품 등록
        const createRes = await fetch(`${JSON_SERVER_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                productName,
                explanation,
                price,
                discount,
                quantity,
                imageUrl
            })
        });

        if (!createRes.ok) {
            return res.status(500).json({ message: '상품 등록 실패' });
        }

        const newProduct = await createRes.json();
        console.log('✅ 상품 등록 성공:', newProduct.productName);
        res.status(201).json({ message: '상품이 등록되었습니다.', product: newProduct });

    } catch (err) {
        console.error('❌ 상품 등록 중 오류 발생:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 상품 리스트 조회
app.get('/goods', async (req, res) => {
    try {
        const goodsRes = await fetch(`${JSON_SERVER_URL}/products`);
        if (!goodsRes.ok) {
            return res.status(500).json({ message: '상품 불러오기 실패' });
        }
        const goods = await goodsRes.json();
        res.status(200).json(goods);
    } catch (err) {
        console.error('❌ 상품 불러오기 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 상품 수정
app.patch('/goods/:id', async (req, res) => {
    const { id } = req.params;
    const { productName, explanation, price, discount, quantity, imageUrl } = req.body;

    try {
        const updateRes = await fetch(`${JSON_SERVER_URL}/products/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productName, explanation, price, discount, quantity, imageUrl })
        });
        if (!updateRes.ok) {
            return res.status(400).json({ message: '상품 수정 실패' });
        }
        const updatedProduct = await updateRes.json();
        res.status(200).json({ message: '상품 수정 성공', product: updatedProduct });
    } catch (err) {
        console.error('❌ 상품 수정 중 오류 발생:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 상품 전체 수정 (PUT + 이미지 포함)
app.put('/goods/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { productName, explanation, price, discount, quantity } = req.body;

    let imageUrl;

    // 파일이 새로 업로드된 경우
    if (req.file) {
        imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    } else {
        // 기존 이미지 유지 위해 먼저 상품 정보 가져옴
        try {
            const existingRes = await fetch(`${JSON_SERVER_URL}/products/${id}`);
            if (!existingRes.ok) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });

            const existing = await existingRes.json();
            imageUrl = existing.imageUrl;
        } catch (err) {
            console.error('❌ 기존 상품 조회 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
    }

    try {
        const updateRes = await fetch(`${JSON_SERVER_URL}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                productName,
                explanation,
                price,
                discount,
                quantity,
                imageUrl
            })
        });

        if (!updateRes.ok) {
            return res.status(400).json({ message: '상품 전체 수정 실패' });
        }

        const updated = await updateRes.json();
        res.status(200).json({ message: '상품 전체 수정 성공', product: updated });

    } catch (err) {
        console.error('❌ 상품 전체 수정 중 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 상품 삭제
app.delete('/goods/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteRes = await fetch(`${JSON_SERVER_URL}/products/${id}`, {
            method: 'DELETE',
        });

        if (!deleteRes.ok) {
            return res.status(400).json({ message: '상품 삭제 실패' });
        }

        res.status(200).json({ message: '상품 삭제 성공', id });
    } catch (err) {
        console.error('❌ 상품 삭제 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
