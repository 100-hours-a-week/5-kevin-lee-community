// window.onload = fetchUserData;

// document.getElementById('correction').addEventListener('click', function(){
//     correction();
// })
// document.getElementById('withdrawl').addEventListener('click', function(){
//     withdrawl();
// })
// document.getElementById('modal_cancel').addEventListener('click', function(){
//     closeModal();
// })
// document.getElementById('modal_confirm').addEventListener('click', function(){
//     deleteUser();
// })

// const modal = document.getElementById('modal_container');
// const sessionID = getCookieID("sessionID");

// // Function to fetch user data
// async function fetchUserData() {
//     const response = await fetch(`http://localhost:4000/users/${sessionID}`);
//     if (response.ok) {
//         const data = await response.json();
//         document.getElementById('email_input').innerText = data.data.email;
//         document.getElementById('nickname_input').placeholder = data.data.nickname;
//     } else {
//         console.error('Failed to fetch user data:', response.status);
//     }

// }


// async function correction(){
//     let nickname = document.getElementById('nickname_input').value;
//     let helper_text = document.getElementById('helper_text');

//     if(nickname.length == 0){
//         helper_text.innerHTML = "*닉네임을 입력해주세요"
//     }
//     else if(nickname.length >= 11){
//         helper_text.innerHTML = "*닉네임은 최대 10자 까지 작성 가능합니다."
//     }
//     else if(await NickDup(nickname)){
//         helper_text.innerHTML = "*닉네임이 중복되었습니다."
//     }
//     else{
//         const response = await fetch(`http://localhost:4000/users/${sessionID}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ nickname: nickname })
//         });
//         if (response.ok) {
//             let tostMessage = document.getElementById('tost_message');
//             tostMessage.classList.add('active');
//             helper_text.innerHTML = "닉네임이 성공적으로 변경되었습니다.";
//             setTimeout(function(){
//                 tostMessage.classList.remove('active');
//             },1000);
//         } else {
//             helper_text.innerHTML = "닉네임 변경에 실패했습니다.";
//             console.error('닉네임 변경 실패:', response.status);
//         }
//     }
// }

// function withdrawl(){
//     modal.classList.remove('hidden');
// }

// function closeModal(){
//     modal.classList.add('hidden');
// }


// async function NickDup(nickname) {
//     const response = await fetch(`http://localhost:4000/users/nickname/check?nickname=${nickname}`);
//     const data = await response.json();
//     return data.status === 400 && data.message === 'already_exist_nickname';
    
// }

// async function deleteUser() {

//     const response = await fetch(`http://localhost:4000/users/${sessionID}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if (response.ok) {
//         alert('회원탈퇴가 완료되었습니다.');
//         window.location.href = "/login"; // 탈퇴 후 로그인 페이지로 이동
//     } else {
//         console.error('회원탈퇴 실패:', response.status);
//         alert('회원탈퇴에 실패했습니다.');
//     }

// }


// //해당하는 이름의 쿠키의 ID값을 가져오기
// function getCookieID(name){
//     let cookieArr = document.cookie.split(";");
    
//     for(let i = 0; i < cookieArr.length; i++) {
//         let cookiePair = cookieArr[i].split("=");
        
//         /* 제거된 공백을 처리 */
//         if(name == cookiePair[0].trim()) {
//             console.log(decodeURIComponent(cookiePair[1]));
//             return decodeURIComponent(cookiePair[1]);
//         }
//     }
//     return null;
// }

window.onload = fetchUserData;

document.getElementById('correction').addEventListener('click', function(){
    correction();
});
document.getElementById('withdrawl').addEventListener('click', function(){
    withdrawl();
});
document.getElementById('modal_cancel').addEventListener('click', function(){
    closeModal();
});
document.getElementById('modal_confirm').addEventListener('click', function(){
    deleteUser();
});

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

const modal = document.getElementById('modal_container');
const sessionID = getCookieID("sessionID");

// Function to fetch user data
async function fetchUserData() {
    const response = await fetch(`http://localhost:4000/users/profile`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        },
        credentials: 'include'
    });
    if (response.ok) {
        const data = await response.json();
        document.getElementById('email_input').innerText = data.data.email;
        document.getElementById('nickname_input').placeholder = data.data.nickname;
    } else {
        console.error('Failed to fetch user data:', response.status);
    }
}

async function correction() {
    let nickname = document.getElementById('nickname_input').value;
    let helper_text = document.getElementById('helper_text');

    if (nickname.length === 0) {
        helper_text.innerHTML = "*닉네임을 입력해주세요";
    } else if (nickname.length >= 11) {
        helper_text.innerHTML = "*닉네임은 최대 10자 까지 작성 가능합니다.";
    } else if (await NickDup(nickname)) {
        helper_text.innerHTML = "*닉네임이 중복되었습니다.";
    } else {
        const response = await fetch(`http://localhost:4000/users/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionID}`
            },
            credentials: 'include',
            body: JSON.stringify({ nickname: nickname })
        });
        if (response.ok) {
            let tostMessage = document.getElementById('tost_message');
            tostMessage.classList.add('active');
            helper_text.innerHTML = "닉네임이 성공적으로 변경되었습니다.";
            setTimeout(function() {
                tostMessage.classList.remove('active');
            }, 1000);
        } else {
            helper_text.innerHTML = "닉네임 변경에 실패했습니다.";
            console.error('닉네임 변경 실패:', response.status);
        }
    }
}

function withdrawl() {
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

async function NickDup(nickname) {
    const response = await fetch(`http://localhost:4000/users/nickname/check?nickname=${nickname}`);
    const data = await response.json();
    return data.status === 400 && data.message === 'already_exist_nickname';
}

async function deleteUser() {
    const response = await fetch(`http://localhost:4000/users/profile`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        },
        credentials: 'include'
    });
    if (response.ok) {
        alert('회원탈퇴가 완료되었습니다.');
        window.location.href = "/login"; // 탈퇴 후 로그인 페이지로 이동
    } else {
        console.error('회원탈퇴 실패:', response.status);
        alert('회원탈퇴에 실패했습니다.');
    }
}

// //해당하는 이름의 쿠키의 ID값을 가져오기
// function getCookieID(name) {
//     let cookieArr = document.cookie.split(";");

//     for (let i = 0; i < cookieArr.length; i++) {
//         let cookiePair = cookieArr[i].split("=");

//         if (name == cookiePair[0].trim()) {
//             console.log(decodeURIComponent(cookiePair[1]));
//             return decodeURIComponent(cookiePair[1]);
//         }
//     }
//     return null;
// }
