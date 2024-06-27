document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('email_input').addEventListener('input', function() {
        validateEmail(this.value);
    });
    document.getElementById('pw_input').addEventListener('input', function() {
        validatePw(this.value);
    });

    document.getElementById('signup').addEventListener('click', function() {
        go_sign();
    });
    document.getElementById('email_input').addEventListener('change', function() {
        changeColor();
    });
    document.getElementById('pw_input').addEventListener('change', function() {
        changeColor();
    });
    document.getElementById('input_submit').addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 제출 동작 방지
        go_login(event);
    });
});

let emailInput;
let pwInput;
let eliEmail = false;
let eliPw = false;

function validateEmail(email) {
    emailInput = email;

    if (emailInput.length == 0) {
        document.getElementById('helper_text').textContent = '이메일을 입력해주세요';
        eliEmail = false;
    } else if (emailInput.length < 5 || !emailInput.includes('@')) {
        document.getElementById('helper_text').textContent = '올바른 이메일이 아닙니다.(예: example@example.com)';
        eliEmail = false;
    } else {
        document.getElementById('helper_text').textContent = 'helper text';
        eliEmail = true;
    }
}

function validatePw(pw) {
    pwInput = pw;
    let eliLength = false;

    if (pwInput.length > 7 && pwInput.length < 20) {
        eliLength = true;
    }

    let eliUpper = /[A-Z]/.test(pwInput);
    let eliLower = /[a-z]/.test(pwInput);
    let eliNumber = /\d/.test(pwInput);
    let eliSpecialChar = /[!@#$%^&*()\-_=+{};:,<.>]/.test(pwInput);
    let eligible = false;

    if (eliLength) {
        eligible = true;
    }
    if (!(eliUpper && eliLower && eliNumber && eliSpecialChar)) {
        eligible = false;
    }

    if (pwInput.length == 0) {
        document.getElementById('helper_text').textContent = '비밀번호를 입력해주세요';
        eliPw = false;
    }
    if (!eligible) {
        document.getElementById('helper_text').textContent = '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        eliPw = false;
    } else {
        document.getElementById('helper_text').textContent = 'helper text';
        eliPw = true;
    }
}

function changeColor() {
    if (eliEmail && eliPw) {
        document.getElementById('login_btn').style.backgroundColor = "#7F6AEE";
    }
}

function go_sign() {
    window.location.href = "/user/signin";
}

async function go_login(event) {
    const email = document.getElementById('email_input').value;
    const password = document.getElementById('pw_input').value;

    const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'  // 쿠키를 포함하여 요청

    });


    const data = await response.json();

    if (response.ok) {
        window.location.href = "/post/";
    } else {
        document.getElementById('helper_text').textContent = data.message || '로그인 중 오류가 발생했습니다.';
    }

}
