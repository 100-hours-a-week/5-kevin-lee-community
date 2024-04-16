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
    sign_go();
})
function validateEmail(email) {
    // 이메일 주소를 검증하는 정규식 패턴
    if (email.length < 5 ^ !email.includes('@')){
        // 올바르지 않은 경우
        document.getElementById('helper_text').textContent = '올바른 이메일이 아닙니다.';
    }else{
        document.getElementById('helper_text').textContent = 'helper text';
    }
}
function validatePw(pw){
    if(pw.length <= 5){
        document.getElementById('helper_text').textContent = '올바른 비밀번호가 아닙니다.';
    }else{
        document.getElementById('helper_text').textContent = 'helper text';
    }
}
function post_detail_go(){
    email  = document.getElementById('email_input').value;
    pw = document.getElementById('pw_input').value;

    if(email.length >= 5 
        && email.includes('@')
        && pw.length >= 5
    ){
        document.getElementById('login_btn').style.backgroundColor = "#7F6AEE";
        window.location.href = "/txt_list";
    }
}
function sign_go(){
    window.location.href = "/signup";
}

