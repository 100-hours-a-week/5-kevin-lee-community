document.getElementById('pw_input').addEventListener('change', function(){
    validatePw();
});
document.getElementById('rePw_input').addEventListener('change', function(){
    validateRePw();
});
document.getElementById('correction').addEventListener('click', function(){
    let tostMessage = document.getElementById('tost_message');
    tostMessage.classList.add('active');
    setTimeout(function(){
        tostMessage.classList.remove('active');
    },1000);
})

function validatePw(){
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
        document.getElementById('helper_text_pw').innerHTML = '비밀번호를 입력해주세요';
    }else if(!eligible){
        document.getElementById('helper_text_pw').innerHTML = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
    }else if(pwValue != rePwValue){
        document.getElementById('helper_text_pw').innerHTML = '비밀번호 확인과 다릅니다.';
    }
    else{
        document.getElementById('helper_text_pw').innerHTML = 'herlper text';
        document.getElementById('helper_text_rePw').innerHTML = 'herlper text';
        correction();
    }
}

function validateRePw(){
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




