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
        document.getElementById('insert_img').src="/img/insert_img.png" ;
    }
});
document.getElementById('signup_btn').addEventListener('click', function(){
    window.location.href = '/login';
})
document.getElementById('signup_btn').addEventListener('submit', async function(event){
    event.preventDefault();

    if(eliEmail && eliNick && eliPw && eliRPw){
        const formData = new FormData(this);
        const email = formData.get('eInput');
        const password = formData.get('pInput');
        const nickname = formData.get('nInput');

        const data = {
            email: email,
            nickname: nickname,
            password: password
        };
        
        try{
            const response = await fetch('/addData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(data)
            });
            if(response.ok){
                console.log("success")
            }else{
                console.error('failed to add data', response.statusText);
            }
        }catch(error){
            console.error('error adding data : ', error);
        }

    }

    window.location.href = "/login"
});




//포커스 아웃 핸들러 모음
let eInputChange = document.getElementById('eInput');
let pInputChange = document.getElementById('pInput');
let rpInputChange = document.getElementById('rpInput');
let nInputChange = document.getElementById('nInput');
eInputChange.addEventListener('change', validateEmail);
pInputChange.addEventListener('change', validatePw);
rpInputChange.addEventListener('change', validateRPW);
nInputChange.addEventListener('change', validateNick);

function go_login(){
    window.location.href = '/login';
}

async function EmailDup(comp) {
    try {
        const response = await fetch("/userInfo.json");
        const data = await response.json();
        const users = data.users;
        return users.some(user => user.email === comp);
    } catch (error) {
        console.error('Error checking email duplication:', error);
        throw error;
    }
}
async function NickDup(comp) {
    
    try {
        const response = await fetch("/userInfo.json");
        const data = await response.json();
        const users = await data.users;
        return users.some(user => user.nickname === comp);
    } catch (error) {
        console.error('Error checking nick duplication:', error);
        throw error;
    }
}

async function isDuplicate(comp, isEmail){
    
    if(!isEmail){
        let rst = await NickDup(comp);
        return rst;
    }else if(isEmail){
        let rst = await EmailDup(comp);
        return rst;
    }else{
        return false;
    }
}

async function validateEmail() {
    // 이메일 주소를 검증하는 정규식 패턴
    let email = document.getElementById('eInput').value;
 
    if (email.length ==0 ){
        document.getElementById('email_helper').textContent = '이메일을 입력해주세요';
        eliEmail = false;
    }else if (email.length < 5 || !email.includes('@')){
        // 올바르지 않은 경우
        document.getElementById('email_helper').textContent = '올바른 이메일이 아닙니다.(예: example@example.com)';
        eliEmail = false;
    }else if(await isDuplicate(email, true)){
        document.getElementById('email_helper').textContent = '중복된 이메일입니다.';
        eliEmail = false;
    }else{
        document.getElementById('email_helper').textContent = '* helper';
        eliEmail = true;
        final_check();
    }
}
function validatePw(){
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
        eliPw = false;
    }
    if(!eligible){
        eliPw = false;
        document.getElementById('pw_helper').textContent = '올바른 비밀번호가 아닙니다.';
    }else{
        document.getElementById('pw_helper').textContent = '* helper';
        eliPw = true;
        final_check();
    }

    pwInput = pw;
}
function validateRPW(){
    let rpw = document.getElementById('rpInput').value;

    if(rpw.length == 0){
        document.getElementById('rePw_helper').textContent='비밀번호를 한번 더 입력해주세요';
        eliRPw = false
    }
    if(rpw != pwInput){
        document.getElementById('rePw_helper').textContent='비밀번호가 다릅니다.';
        eliRPw = false
    }
    else{
        document.getElementById('rePw_helper').textContent='* helper';
        eliRPw = true;
        final_check();
    }
}
async function validateNick(){
    let nickname = document.getElementById('nInput').value;

    if(nickname.length == 0){
        document.getElementById('nickname_helper').textContent='닉네임을 입력해주세요';
        eliNick = false;
    }else if(nickname.indexOf(' ') !== -1){
        document.getElementById('nickname_helper').textContent='띄어쓰기를 없애주세요';
        eliNick = false;
    }else if(nickname.length > 10){
        document.getElementById('nickname_helper').textContent='닉네임은 최대 10자 까지 작성 가능합니다.';
        eliNick = false;
    }else if(await isDuplicate(nickname, false)){
        document.getElementById('nickname_helper').textContent='중복된 닉네임입니다.';
        eliNick = false;
    }else{
        document.getElementById('nickname_helper').textContent='* helper';
        eliNick = true;
        final_check();
    }
}

function final_check(){
    console.log(eliEmail, eliNick, eliPw, eliRPw)
    if(eliEmail && eliNick && eliPw && eliRPw){
        document.getElementById('signup_btn').style.backgroundColor = '#7f6aee'
    }else{
        document.getElementById('signup_btn').style.backgroundColor = '#aca0eb'
    }
}
