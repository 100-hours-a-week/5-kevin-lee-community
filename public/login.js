document.getElementById('email_input').addEventListener('input', function() {
    validateEmail(this.value);
});
document.getElementById('pw_input').addEventListener('input', function(){
    validatePw(this.value);
});
document.getElementById('login_btn').addEventListener('click', function(){
    post_detail_go();
});
document.getElementById('signup').addEventListener('click', function(){
    go_sign();
})

let emailInput;
let pwInput;

function validateEmail(email) {
    emailInput = email;

    if (emailInput.length ==0 ){
        document.getElementById('helper_text').textContent = '이메일을 입력해주세요';
    }else if (emailInput.length < 5 ^ !emailInput.includes('@')){
        // 올바르지 않은 경우
        document.getElementById('helper_text').textContent = '올바른 이메일이 아닙니다.(예: example@example.com)';
    }else{
        document.getElementById('helper_text').textContent = 'helper text';
    }
}
function validatePw(pw){
    pwInput = pw;
    let eliLength = false;
    
    if (pwInput.length > 7 && pwInput.length < 20){
         eliLength = true;
    }

    let eliUpper = /[A-Z]/.test(pwInput);
    let eliLowwer = /[a-z]/.test(pwInput);
    let eliNumber = /\d/.test(pwInput);
    let eliSpecialChar = /[!@#$%^&*()\-_=+{};:,<.>]/.test(pwInput);
    let eligible = false

    if(eliLength){
        eligible = true
    }
    if (!(eliUpper && eliLowwer && eliNumber && eliSpecialChar)) {
        eligible = false;
    }

    if (pwInput.length == 0){
        document.getElementById('helper_text').textContent = '비밀번호를 입력해주세요';
    }
    if(!eligible){
        document.getElementById('helper_text').textContent = '비밀번호가 다릅니다.';
    }else{
        document.getElementById('helper_text').textContent = 'helper text';
    }

}
function post_detail_go(){
    
    if(emailInput.length >= 5 
        && emailInput.includes('@')
        && pwInput.length >= 5
    ){
        document.getElementById('login_btn').style.backgroundColor = "#7F6AEE";
        window.location.href = "/txt_list";
        return;
    }else if(email.length < 5 ^ !email.includes('@')){
        document.getElementById('helper_text').textContent = '올바른 이메일이 아닙니다.';
    }else if(pw.length <= 5 ){
        document.getElementById('helper_text').textContent = '올바른 비밀번호가 아닙니다.';
    }


}
function go_sign(){
    window.location.href = "/signup";
}

