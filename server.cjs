const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

//cors 설정
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true //쿠키 허용
}));

app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = 'your_secret_key_here';

//회원가입
app.post('/join', async (req, res) => {
    console.log('회원가입 서버 실행');
    const {name, email, id, password} = req.body;

    try{
        const dbPath = path.join(__dirname, 'joindb.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

        //이메일 중복검사
        const findUserEmail = db.users.find(user => user.email === email);
        if(findUserEmail) {
            console.error('이메일 중복');
            return res.status(409).json({ message: '이미 사용중인 이메일입니다.' });
        }

        //아이디 중복검사
        const findUserId = db.users.find(user => user.id === id);
        if(findUserId) {
            console.error('아이디 중복');
            return res.status(409).json({ message: '이미 사용중인 아이디입니다.' });
        };

        //새로운 유저 생성
        const createUserRes = await fetch(`${JSON_SERVER_URL}/users`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name, email, id, password})
        });

        if(!createUserRes.ok) {
            return res.status(500).json({ message: '회원가입에 실패하였습니다.' });
        }

        const newUser = await createUserRes.json();
        res.status(201).json({ message: '회원가입 성공', user: newUser });
    }catch(err) {
        console.error('회원가입 서버 오류', err);
        return res.status(500).json({ message: '회원가입 서버 오류' });
    }
});

//로그인 API
app.post('/login', (req, res) => {
    const {id, password} = req.body;

    const dbpath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbpath, 'utf-8'));

    const foundUser = db.users.find(user => user.id === id && user.password === password);

    //테스트용 인증
    if(!foundUser) {
        return res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
    }

    const token = jwt.sign({ id: foundUser.id, name: foundUser.name }, SECRET_KEY, {expiresIn: '1h'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: false, //개발환경 false
        sameSite: 'Lax'
    });

    res.json({ message: '로그인 성공' });
});

//인증 미들웨어
const verifyToken = (req, res, next) => {
    console.log('verifyToken 실행');
    const token = req.cookies.token;
    console.log('받은 토큰:', token);
    if(!token) {
        console.log('토큰 없음 - 401 반환');
        return res.status(401).json({ message: '토큰 없음' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('토큰 검증 성공:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('토큰 검증 실패 - 401 반환');
        return res.status(401).json({ message: '유효하지 않은 토큰' });
    };
};

//DB기준으로 저장
app.get('/me', verifyToken, (req, res) => {
    const dbpath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbpath, 'utf-8'));

    const user = db.users.find(user => user.id === req.user.id);

    if (!user) {
        return res.status(404).json({ message: '사용자 없음' });
    }

    res.json({ user });
});


app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: '로그아웃 완료' });
});

//회원정보 수정
app.patch('/user', verifyToken, (req, res) => {
    console.log('PATCH /user 호출됨');
    console.log('토큰에서 추출한 사용자:', req.user);
    console.log('요청 바디:', req.body);
    const dbpath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbpath, 'utf-8'));
    
    const userId = req.user.id; // 토큰에서 아이디 추출
    const { name } = req.body;

    const userIndex = db.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: '사용자 없음' });
    }

    db.users[userIndex].name = name;

    console.log('이름 변경 후 DB:', db.users[userIndex]);

    fs.writeFileSync(dbpath, JSON.stringify(db, null, 2));

    res.json({ message: '이름 변경 완료', user: db.users[userIndex] });
});




app.listen(PORT, () => {
    console.log(`서버 실행 중 http://localhost:${PORT}`)
});