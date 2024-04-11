// express 모듈을 불러옵니다.
import express from 'express';
import path from "path";
// express 애플리케이션을 생성합니다.
const app = express();
// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 3000;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')))

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/clientinfo_alter', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'clientinfo_alter.html'));
});
app.get('/create_post', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create_post.html'));
});
app.get('/post_correct', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'post_correct.html'));
});
app.get('/post_detail', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'post_detail.html'));
});
app.get('/pw_alter', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pw_alter.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/txt_list', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'txt_list.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});