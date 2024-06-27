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
// document.getElementById('signup_btn').addEventListener('click', function(){
//     window.location.href = '/login';
// })
// document.getElementById('signup_btn').addEventListener('submit', async function(event){
//     event.preventDefault();

//     if(eliEmail && eliNick && eliPw && eliRPw){
//         //보존용
//         // const formData = new FormData(this);
//         // const email = formData.get('eInput');
//         // const password = formData.get('pInput');
//         // const nickname = formData.get('nInput');

//         // const data = {
//         //     email: email,
//         //     nickname: nickname,
//         //     password: password
//         // };
        
//         // try{
//         //     const response = await fetch('/addData', {
//         //         method: 'POST',
//         //         headers: {
//         //             'Content-Type': 'application/json'
//         //         }, 
//         //         body: JSON.stringify(data)
//         //     });
//         //     if(response.ok){
//         //         console.log("success")
//         //     }else{
//         //         console.error('failed to add data', response.statusText);
//         //     }
//         // }catch(error){
//         //     console.error('error adding data : ', error);
//         // }
        
//     }

//     window.location.href = "/login"
// });




//포커스 아웃 핸들러 모음
let eInputChange = document.getElementById('eInput');
let pInputChange = document.getElementById('pInput');
let rpInputChange = document.getElementById('rpInput');
let nInputChange = document.getElementById('nInput');
eInputChange.addEventListener('change', validateEmail);
pInputChange.addEventListener('change', validatePw);
rpInputChange.addEventListener('change', validateRPW);
nInputChange.addEventListener('change', validateNick);

document.getElementById('eInput').addEventListener('blur', async function () {
    const email = this.value;
    const emailHelper = document.getElementById('email_helper');

    if (email) {
        const response = await fetch(`http://localhost:4000/users/email/check?email=${email}`);
        const result = await response.json();

        if (response.ok && result.status === 200) {
            emailHelper.textContent = "사용 가능한 이메일입니다.";
            emailHelper.style.color = "red";
            eliEmail = true;
        } else {
            emailHelper.textContent = "이미 사용 중인 이메일입니다.";
            emailHelper.style.color = "red";
            eliEmail = false;
        }
    }
});

document.getElementById('nInput').addEventListener('blur', async function () {
    const nickname = this.value;
    const nicknameHelper = document.getElementById('nickname_helper');

    if (nickname) {
            const response = await fetch(`http://localhost:4000/users/nickname/check?nickname=${nickname}`);
            const result = await response.json();

            if (response.ok && result.status === 200) {
                nicknameHelper.textContent = "사용 가능한 닉네임입니다.";
                nicknameHelper.style.color = "red";
                eliNick = true;
            } else {
                nicknameHelper.textContent = "이미 사용 중인 닉네임입니다.";
                nicknameHelper.style.color = "red";
                eliNick = false;
        }
    }
});


function go_login(){
    window.location.href = '/user/login';
}

//서버와 통신해서 중복인지를 확인하는 fetch 작성 필요

// async function EmailDup(comp) {
//     try {
//         const response = await fetch("/userInfo.json");
//         const data = await response.json();
//         const users = data.users;
//         return users.some(user => user.email === comp);
//     } catch (error) {
//         console.error('Error checking email duplication:', error);
//         throw error;
//     }
// }
// async function NickDup(comp) {
    
//     try {
//         const response = await fetch("/userInfo.json");
//         const data = await response.json();
//         const users = await data.users;
//         return users.some(user => user.nickname === comp);
//     } catch (error) {
//         console.error('Error checking nick duplication:', error);
//         throw error;
//     }
// }

// async function isDuplicate(comp, isEmail){
    
//     if(!isEmail){
//         let rst = await NickDup(comp);
//         return rst;
//     }else if(isEmail){
//         let rst = await EmailDup(comp);
//         return rst;
//     }else{
//         return false;
//     }
// }

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
        document.getElementById('signup_btn').disabled = false;
    }else{
        document.getElementById('signup_btn').style.backgroundColor = '#aca0eb'
        document.getElementById('signup_btn').disabled = true;
    }
}

// document.getElementById('input_submit').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const email = document.getElementById('eInput').value;
//     const password = document.getElementById('pInput').value;
//     const nickname = document.getElementById('nInput').value;
//     const img_file = document.getElementById('file_input').files[0];
//     const formData = new FormData();

//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('nickname', nickname);
//     formData.append('img_file', img_file);

//     fetch('http://localhost:4000/users/signup', {
//         method: 'POST',
//         body: formData,
//     })
//     .then(response => response.json())
//     .then(result => {
//         if (result.message === 'register_success') {
//             window.location.href = '/user/login.html';  // 성공 시 이동할 페이지
//         } else {
//             console.error('회원가입 실패:', result.message);
//         }
//     })
//     .catch(error => {
//         console.error('회원가입 중 오류 발생:', error);
//     });
// });
document.getElementById('input_submit').addEventListener('submit', function(event){
    submitForm(event);
})

  
function submitForm(event){
    event.preventDefault();
    const email = document.getElementById('eInput').value;
    const password = document.getElementById('pInput').value;
    const nickname = document.getElementById('nInput').value;
    const fileInput = document.getElementById('file_input').value; // 파일 경로를 문자열로 가져오기

    // JSON 형식으로 데이터 전송
    const data = {
        email: email,
        password: password,
        nickname: nickname,
        profileImagePath: fileInput // 파일 경로 문자열로 전송
    };

    fetch('http://localhost:4000/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(result => {
        if (result.message === 'register_success') {
            window.location.href = '/user/login';  // 성공 시 이동할 페이지
        } else {
            console.error('회원가입 실패:', result.message);
        }
    })
    
}