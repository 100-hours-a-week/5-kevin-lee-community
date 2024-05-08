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

async function correction(){
    let nickname = document.getElementById('nickname_input').value;
    let helper_text = document.getElementById('helper_text');

    if(nickname.length == 0){
        helper_text.innerHTML = "*닉네임을 입력해주세요"
    }
    else if(nickname.length >= 11){
        helper_text.innerHTML = "*닉네임은 최대 10자 까지 작성 가능합니다."
    }
    else if(await NickDup(nickname)){
        helper_text.innerHTML = "*닉네임이 중복되었습니다."
    }
    else{
        let tostMessage = document.getElementById('tost_message');
        tostMessage.classList.add('active');
        helper_text.innerHTML = "helper text"
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

