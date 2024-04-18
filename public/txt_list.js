
//게시글 작성 버튼 관련
const post_create_btn = document.getElementById('postCreate');
const posts = document.querySelectorAll('.post');

post_create_btn.addEventListener('click', go_postCreate);
function go_postCreate(){
    window.location.href = '/create_post';
}
posts.forEach(post => {
    post.addEventListener('click', function() {
        window.location.href = '/post_detail';
    });
  });

post_create_btn.addEventListener('mouseenter', function(){
    post_create_btn.style.backgroundColor = '#7f6aee';
})
post_create_btn.addEventListener('mouseleave', function(){
    post_create_btn.style.backgroundColor = '#aca0eb';
})


//제목 26자 짜르기
window.addEventListener('DOMContentLoaded', (event) => {
    // DOMContentLoaded 이벤트가 발생하면 실행될 코드
    const titles = document.getElementsByClassName('post_title');
    for(let i = 0; i < titles.length; i++){
      let title = titles[i].innerText;
      title = title.slice(0, 26);
      titles[i].innerText = title;
    }
  });

//숫자 짜르기
window.addEventListener('DOMContentLoaded', (event) => {
    const good_numbers = document.getElementsByClassName('good_number');
    const comment_numbers = document.getElementsByClassName('comment_number');
    const hits_numbers = document.getElementsByClassName('hits_number');

    for(var i = 0; i < good_numbers.length; i++){
        let gNum = parseInt(good_numbers[i].innerText);
        let cNum = parseInt(comment_numbers[i].innerText);
        let hNum = parseInt(hits_numbers[i].innerText);

        if(gNum >= 100000){
            good_numbers[i].innerText = '100k';
        }else if(gNum >= 10000){
            good_numbers[i].innerText = '10k';
        }else if(gNum >= 1000){
            good_numbers[i].innerText = '1k';
        }

        if(cNum >= 100000){
            comment_numbers[i].innerText = '100k';
        }else if(cNum >= 10000){
            comment_numbers[i].innerText = '10k';
        }else if(cNum >= 1000){
            comment_numbers[i].innerText = '1k';
        }

        if(hNum >= 100000){
            hits_numbers[i].innerText = '100k';
        }else if(hNum >= 10000){
            hits_numbers[i].innerText = '10k';
        }else if(hNum >= 1000){
            hits_numbers[i].innerText = '1k';
        }

      }
});