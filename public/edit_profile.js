document.getElementById('correction').addEventListener('click', function(){
    correction();
})
document.getElementById('withdrawl').addEventListener('click', function(){
    withdrawl();
})
document.getElementById('modal_cancel').addEventListener('click', function(){
    closeModal();
})
document.getElementById('modal_confirm').addEventListener('click', function(){
    confirmed();
})
const modal = document.getElementById('modal_container');

function correction(){
    let nickname = document.getElementById('nickname_input').value;
    let helper_text = document.getElementById('helper_text');

    if(nickname.length == 0){
        helper_text.innerHTML = "*닉네임을 입력해주세요"
    }
    else if(nickname.length >= 11){
        helper_text.innerHTML = "*닉네임은 최대 10자 까지 작성 가능합니다."
    }
    //중복 검사 코드 추가 필요
    else{
        let tostMessage = document.getElementById('tost_message');
        tostMessage.classList.add('active');
        setTimeout(function(){
            tostMessage.classList.remove('active');
        },1000);
    }
}

function withdrawl(){
    modal.classList.remove('hidden');
}

function closeModal(){
    modal.classList.add('hidden');
}
function confirmed(){
    window.location.href="/login"
}

