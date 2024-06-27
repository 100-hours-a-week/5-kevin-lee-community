function formatNum(num){
    if (num >= 100000) {
        return '100k';
    } else if (num >= 10000) {
        return '10k';
    } else if (num >= 1000) {
        return '1k';
    } else {
        return num;
    }
}

function formatTitle(title){
    const newTitle = title.slice(0, 26);

    return newTitle;
}

document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById('posts-container');

    // 서버에서 postInfo 데이터를 가져옵니다.
    fetch('http://localhost:4000/posts/')
        .then(response => response.json())
        .then(response => {

            if (response.status === 200 && Array.isArray(response.data)) {
                response.data.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.classList.add('post');

                    const createdAt = new Date(post.created_at);
                    const date_yyyymmdd = createdAt.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
                    const date_time = createdAt.toTimeString().slice(0, 8); // HH:MM:SS 형식으로 변환

                    const title = formatTitle(post.post_title);
                    const comment_counts = formatNum(post.comment_counts);
                    const hits = formatNum(post.hits);
                    const likes = formatNum(post.likes);

                    //postId 동봉
                    postDiv.setAttribute('data-id', post.post_id);
                    postDiv.innerHTML = `<div class="post">
            <p class="post_title">
            ${title}
            </p>
            <div class="post_list">
                <div class="good">
                    <p>좋아요</p> <p class="good_number">${likes}</p>
                </div>
                <div class="comment">
                    <p>댓글</p> <p class="comment_number">${comment_counts}</p>
                </div>
                <div class="hits">
                    <p>조회수</p>
                    <p class="hits_number">${hits}</p>
                </div>
                <div class="date">
                    <p class = "date_yyyymmdd">${date_yyyymmdd}</p>
                    <p class = "date_time">${date_time}</p>
                </div>                
            </div>
                <hr class="horizontal-rule"/>
                <div class="creator_list">
                    <div id="circle"></div>         
                    <p class="creator">${post.nickname}</p>       
                </div>
            </div>`;
                    postsContainer.appendChild(postDiv);

                    //게시글 클릭 이벤트 핸드러
                    postDiv.addEventListener('click', function() {
                        const postId = postDiv.getAttribute('data-id');
                        window.location.href = `/post/detail/${postId}`;
                    });
                });
            } else {
                console.error('Unexpected response format or status:', response);
            }
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
});

//게시글 작성 버튼 관련
const post_create_btn = document.getElementById('postCreate');
const posts = document.querySelectorAll('.post');

post_create_btn.addEventListener('click', go_postCreate);
function go_postCreate(){
    window.location.href = '/post/create';
}

post_create_btn.addEventListener('mouseenter', function(){
    post_create_btn.style.backgroundColor = '#7f6aee';
})
post_create_btn.addEventListener('mouseleave', function(){
    post_create_btn.style.backgroundColor = '#aca0eb';
})


//제목 26자 짜르기
// window.addEventListener('DOMContentLoaded', (event) => {
//     // DOMContentLoaded 이벤트가 발생하면 실행될 코드
//     const titles = document.getElementsByClassName('post_title');
//     for(let i = 0; i < titles.length; i++){
//       let title = titles[i].innerText;
//       title = title.slice(0, 26);
//       titles[i].innerText = title;
//     }
//   });

//숫자 짜르기
// window.addEventListener('DOMContentLoaded', (event) => {
//     const good_numbers = document.getElementsByClassName('good_number');
//     const comment_numbers = document.getElementsByClassName('comment_number');
//     const hits_numbers = document.getElementsByClassName('hits_number');

//     for(var i = 0; i < good_numbers.length; i++){
//         let gNum = parseInt(good_numbers[i].innerText);
//         let cNum = parseInt(comment_numbers[i].innerText);
//         let hNum = parseInt(hits_numbers[i].innerText);

//         if(gNum >= 100000){
//             good_numbers[i].innerText = '100k';
//         }else if(gNum >= 10000){
//             good_numbers[i].innerText = '10k';
//         }else if(gNum >= 1000){
//             good_numbers[i].innerText = '1k';
//         }

//         if(cNum >= 100000){
//             comment_numbers[i].innerText = '100k';
//         }else if(cNum >= 10000){
//             comment_numbers[i].innerText = '10k';
//         }else if(cNum >= 1000){
//             comment_numbers[i].innerText = '1k';
//         }

//         if(hNum >= 100000){
//             hits_numbers[i].innerText = '100k';
//         }else if(hNum >= 10000){
//             hits_numbers[i].innerText = '10k';
//         }else if(hNum >= 1000){
//             hits_numbers[i].innerText = '1k';
//         }

//       }
// });