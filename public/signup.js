//look: 중복처리 기능 미완성 상태. fetch부분 너무 어려움. 


const userInfoPath = "./public/userInfo.json";
const eInput = document.getElementById('eInput');
const pInput = document.getElementById('pInput');
const rpInput = document.getElementById('rpInput');
const nInput = document.getElementById('nInput');
let pwInput;
let eliEmail = false;
let eliPw = false;
let eliRPw = false;
let eliNick = false;

document.getElementById('navigate_icon').addEventListener('click', function(){
    go_login();
});
document.getElementById('login_btn').addEventListener('click', function(){
    go_login();
})
document.getElementById('file_input').addEventListener('change', function(event){
    const file = event.target.files[0];

    if(file){
        const reader = new FileReader();

        reader.onload = function(){
            const imageDataUrl = reader.result;
            document.getElementById('insert_img').src = imageDataUrl;
        };

        reader.readAsDataURL(file);
    }
    else {
        document.getElementById('insert_img').src="/public/img/insert_img.png" ;
    }
})
//포커스 아웃 핸들러 모음
eInput.addEventListener('blur', validateEmail);
pInput.addEventListener('blur', validatePw);
rpInput.addEventListener('blur', validateRPW);
nInput.addEventListener('blur', validateNick);

function go_login(){
    window.location.href = '/login';
}
function readJSONFIle(filePath){
   return fetch(filePath)
   .then(response => {
    if(!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json();
   })
   .then(data => {
    return data;
   })
   .catch(error =>{
    console.error('error reading json file: ', error);
   });
}

function isDulicate(comp){
    const userInfo = readJSONFIle(userInfoPath);
    var isEmail = /\S+@\S+\.\S+/.test(comp);
    var isNickname = !isEmail;

    if(isNickname){
        var isDupNickName = userInfo.some(userInfo => user.nickname === comp);
        return isDupNickName;
    }else if(isEmail){
        var isDupEmail = userInfo.some(userInfo => user.email === comp);
        return isDupEmail;
    }else{
        return false
    }

}

function validateEmail() {
    // 이메일 주소를 검증하는 정규식 패턴
    let email = document.getElementById('eInput').value;
    console.log(email);
    if (email.length ==0 ){
        document.getElementById('email_helper').textContent = '이메일을 입력해주세요';
    }else if (email.length < 5 ^ !email.includes('@')){
        // 올바르지 않은 경우
        document.getElementById('email_helper').textContent = '올바른 이메일이 아닙니다.(예: example@example.com)';
    }else if(isDulicate(email)){
        document.getElementById('email_helper').textContent = '중복된 이메일입니다.';
    }
    else{
        document.getElementById('email_helper').textContent = '이메일을 입력해주세요';
    }
}
function validatePw(input){
    //비밀번호 검사 지표
    let pw = document.getElementById('pInput').value;
    let eliLength = false;
    
    if (pw.length > 7 && pw.length < 20){
         eliLength = true;
    }

    let eliUpper = /[A-Z]/.test(pw);
    let eliLowwer = /[a-z]/.test(pw);
    let eliNumber = /\d/.test(pw);
    let eliSpecialChar = /[!@#$%^&*()\-_=+{};:,<.>]/.test(pw);
    let eligible = false

    if(eliLength){
        eligible = true
    }
    if (!(eliUpper && eliLowwer && eliNumber && eliSpecialChar)) {
        eligible = false;
    }

    if (pw.length == 0){
        document.getElementById('pw_helper').textContent = '비밀번호를 입력해주세요';
    }
    if(!eligible){
        document.getElementById('pw_helper').textContent = '올바른 비밀번호가 아닙니다.';
    }else{
        document.getElementById('pw_helper').textContent = '비밀번호를 입력해주세요';
    }

    pwInput = pw;
}
function validateRPW(input){
    let rpw = document.getElementById('rpInput').value;

    if(rpw.length == 0){
        document.getElementById('rePw_helper').textContent='비밀번호를 한번 더 입력해주세요';
    }
    if(rpw != pwInput){
        document.getElementById('rePw_helper').textContent='비밀번호가 다릅니다.';
    }
}
function validateNick(input){
    let nickname = document.getElementById('nInput').value;
    let eligible = false

    if(nickname.indexOf(' ') == -1 && nickname.length <= 10){
        eligible = true   
    }

    if(nickname.length == 0){
        document.getElementById('nickname_helper').textContent='닉네임을 입력해주세요';
    }else if(nickname.indexOf(' ') !== -1){
        document.getElementById('nickname_helper').textContent='띄어쓰기를 없애주세요';
    }else if(nickname.length > 10){
        document.getElementById('nickname_helper').textContent='닉네임은 최대 10자 까지 작성 가능합니다.';
    }else if(isDulicate(nickname)){
        document.getElementById('nickname_herlper').textContent='중복된 닉네임입니다.';
    }

}

