function getCookieID(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            console.log(decodeURIComponent(cookiePair[1]));
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

document.getElementById('pw_input').addEventListener('change', function(){
    validatePw();
});
document.getElementById('rePw_input').addEventListener('change', function(){
    validateRePw();
});
document.getElementById('correction').addEventListener('click', async function(){
    const newPassword = document.getElementById('pw_input').value;
    const confirmPassword = document.getElementById('rePw_input').value;

    const sessionID = getCookieID('sessionID');

    if (newPassword.length === 0 || confirmPassword.length === 0) {
        helperText.innerHTML = "*비밀번호를 입력해주세요";
    } else if (newPassword !== confirmPassword) {
        helperText.innerHTML = "*비밀번호가 일치하지 않습니다";
    } else {
        
        const response = await fetch(`http://localhost:4000/users/profile/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionID}`
            },
            credentials: 'include',
            body: JSON.stringify({ password: newPassword })
        });
        if (response.ok) {
            let tostMessage = document.getElementById('tost_message');
            tostMessage.classList.add('active');
            setTimeout(function(){
                tostMessage.classList.remove('active');
            },1000);
        }
    }
})





function validatePw(){
    let correction_btn = document.getElementById('correction');


    //비밀번호 검사 지표
    let pwValue = document.getElementById('pw_input').value;
    let rePwValue = document.getElementById('rePw_input').value;
    let eliLength = false;
    
    if (pwValue.length > 7 && pwValue.length < 20){
        eliLength = true;
    }

    let eliUpper = /[A-Z]/.test(pwValue);
    let eliLowwer = /[a-z]/.test(pwValue);
    let eliNumber = /\d/.test(pwValue);
    let eliSpecialChar = /[!@#$%^&*()\-_=+{};:,<.>]/.test(pwValue);
    let eligible = false

    if(eliLength){
        eligible = true
    }
    if (!(eliUpper && eliLowwer && eliNumber && eliSpecialChar)) {
        eligible = false;
    }
 
    if (pwValue.length == 0){
        correction_btn.style.backgroundColor = "#aca0eb";

        document.getElementById('helper_text_pw').innerHTML = '비밀번호를 입력해주세요';
    }else if(!eligible){
        correction_btn.style.backgroundColor = "#aca0eb";

        document.getElementById('helper_text_pw').innerHTML = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
    }else if(pwValue != rePwValue){
        correction_btn.style.backgroundColor = "#aca0eb";

        document.getElementById('helper_text_pw').innerHTML = '비밀번호 확인과 다릅니다.';
    }
    else{
        correction_btn.style.backgroundColor = "#aca0eb";

        document.getElementById('helper_text_pw').innerHTML = 'herlper text';
        document.getElementById('helper_text_rePw').innerHTML = 'herlper text';
        correction();
    }
}

function validateRePw(){
    let correction_btn = document.getElementById('correction');


    //비밀번호 검사 지표
    let pwValue = document.getElementById('pw_input').value;
    let rePwValue = document.getElementById('rePw_input').value;
    let eliLength = false;
    
    if (rePwValue.length > 7 && rePwValue.length < 20){
        eliLength = true;
    }

    let eliUpper = /[A-Z]/.test(rePwValue);
    let eliLowwer = /[a-z]/.test(rePwValue);
    let eliNumber = /\d/.test(rePwValue);
    let eliSpecialChar = /[!@#$%^&*()\-_=+{};:,<.>]/.test(rePwValue);
    let eligible = false

    if(eliLength){
        eligible = true
    }
    if (!(eliUpper && eliLowwer && eliNumber && eliSpecialChar)) {
        eligible = false;
    }
 
    if (rePwValue.length == 0){
        correction_btn.style.backgroundColor = "#aca0eb";
        document.getElementById('helper_text_rePw').innerHTML = '비밀번호를 한번 더 입력해주세요';
    }else if(!eligible){
         document.getElementById('helper_text_rePw').innerHTML = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
    }else if(pwValue != rePwValue){
        document.getElementById('helper_text_rePw').innerHTML = '비밀번호와 다릅니다.';
    }
    else{
        document.getElementById('helper_text_pw').innerHTML = 'herlper text';

        document.getElementById('helper_text_rePw').innerHTML = 'herlper text';

        correction();
    }
}

function correction(){

    let correction_btn = document.getElementById('correction');

    correction_btn.style.backgroundColor = "#7f6aee";
}




