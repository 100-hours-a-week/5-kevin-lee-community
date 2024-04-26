//뒤로가기 이벤트
document.getElementById('navigate_icon').addEventListener('click', function(){
    window.location.href = "/txt_list"
}); 
//게시글 수정 버튼 이벤트
document.getElementById('post_creator_correction').addEventListener('click', function(){
    window.location.href = "/post_correct"
});
//댓글 입력시 검사 기능
document.getElementById('comments_input').addEventListener('change', function(){
    check_comment();
})
//댓글 등록 기능 전역 변수 comment_target에 id를 저장해서, 해당 내용 변경 혹은 입력으로 변경
document.getElementById('comments_btn').addEventListener('click', function(){
    if(comment_target == null){
        //아직 미구현
    }else{
        //댓글 수정 기능. 
        //target 본문에 comments_input에 입력한 내용 대입
        //애는 DOM트리만 변경. 파일 내용은 변경되지 않음.
        //fetch를 써서 구혀할 것.
        document.getElementById(comment_target).innerText = document.getElementById('comments_input').value;
        document.getElementById('comments_input').value = "";

        //버튼 원상복귀
        document.getElementById('comments_btn').innerText ="댓글 수정";
        comment_target = null;
    }
})

//댓글 이벤트 추가
document.getElementById('comments_list1_correctBtn').addEventListener('click', function(){
    correct_comment();
})
//댓글 삭제 이벤트 추가
document.getElementById('comments_lsit1_deleteBtn').addEventListener('click', function(){
    delete_comment();
})


const post_delete_modal = document.getElementById('postDelete_container');
const commant_delete_modal = document.getElementById('commantDelete_container');
let comment_target = null;

document.getElementById('post_creator_delete').addEventListener('click', function(){
    post_delete_modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});
document.getElementById('postDelete_cancel').addEventListener('click', function(){
    post_delete_modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
})

window.addEventListener('DOMContentLoaded', (event) => {
    let hits = document.getElementById('hits_cnt');
    let commants = document.getElementById('commants_cnt');
    let hit_cnt = hits.innerText;
    let commants_cnt = commants.innerText;

    if(hit_cnt >= 100000){
        hits.innerText = "100k";
    }else if(hit_cnt >= 10000){
        hits.innerText = "10k"
    }else if(hit_cnt >= 1000){
        hits.innerText = "1k"
    }

    if(commants_cnt >= 100000){
        commants.innerText = "100k";
    }else if(commants_cnt >= 10000){
        commants.innerText = "10k"
    }else if(commants_cnt >= 1000){
        commants.innerText = "1k"
    }
});

function check_comment(){
    let comment_input = document.getElementById('comments_input');
    let comment_value = comment_input.value;
    let comment_btn = document.getElementById('comments_btn');

    if(comment_value.length == 0){
        //버튼 비활성화 기능
        comment_btn.disabled = true;
        comment_btn.style.backgroundColor = "#aca0eb"
    }else if(comment_value.length >0){
        comment_btn.disabled = false;
        comment_btn.style.backgroundColor = "#7f6aee"
    }
}

//5번 댓글 수정 
function correct_comment(){
    //타겟 아이디
    target_id = "comments_list1_creator_content";
    //내용 가져오기
    let content =  document.getElementById(target_id).innerText;

    //댓글창에 내용 넣기
    let comment_output= document.getElementById('comments_input');
    comment_output.value = content;

    //target id 지정
    comment_target = target_id;

    //버튼 댓글 수정으로 변경
    document.getElementById('comments_btn').innerText ="댓글 수정";

}

//댓글 삭제 기능, 확인 버튼 미구현
function delete_comment(){
    comment_delete_modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
document.getElementById('commantDelete_cancel').addEventListener('click', function(){
    comment_delete_modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
})