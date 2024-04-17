
//게시글 작성 버튼 관련
const post_create_btn = document.getElementById('postCreate');

post_create_btn.addEventListener('click', go_postCreate);
function go_postCreate(){
    window.location.href = '/create_post';
}

post_create_btn.addEventListener('mouseenter', function(){
    post_create_btn.style.backgroundColor = '#7f6aee';
})
post_create_btn.addEventListener('mouseleave', function(){
    post_create_btn.style.backgroundColor = '#aca0eb';
})


//제목 26자 짜르기
const titles = document.getElementsByClassName('post_title');
window.addEventListener('DOMContentLoaded', (event) => {
    // DOMContentLoaded 이벤트가 발생하면 실행될 코드
    const titles = document.getElementsByClassName('post_title');
    for(let i = 0; i < titles.length; i++){
      let title = titles[i];
      console.log(title)
      title = title.inner
      titles[i].textContent = title;
    }
  });


