
document.getElementById('backward').addEventListener('click', function(){
    window.location.href = "/post/"
})
//받기만 하고, 전송 기능 없음
document.getElementById('image_input').addEventListener('change', function(event){
    const file = event.target.files[0];

    if(file){
        const reader = new FileReader();

        reader.readAsDataURL(file);
    }
})

document.getElementById('complete').addEventListener('click', function(event){
    event.preventDefault();

    const title_input = document.getElementById('title_input');
    const content_input = document.getElementById('content_input');    
    const post_title = title_input.value;
    const post_content = content_input.value;
    
    //user_id 임시 입력
    const user_id = 1;
    
    if(post_title == '' || post_content == ''){
        document.getElementById('helper_text').innerHTML = "제목, 내용을 모두 작성해주세요";
    }else{
        document.getElementById('helper_text').innerHTML = "helper text";
        fetch(`http://localhost:4000/posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post_title, post_content , user_id})
        })
        .then(response => {
            if (response.status != 201) {
                throw new Error('게시글 작성에 실패했습니다.');
            }
            return response.json();
        })
        .then(data => {
            alert('게시글이 작성되었습니다.');
            window.location.href = `/post/detail/${data.data.post_id}`;
        })
        
    }


});

document.getElementById('title_input').addEventListener('change', function(event){
    let title_input = document.getElementById('title_input');
    let content_input = document.getElementById('content_input');  
    let title_value = title_input.value;
    let content_value = content_input.value;

    if (title_value.length !=0 && content_value.length != 0){
        document.getElementById('complete').style.backgroundColor = "#7f6aee";
    }else{
        document.getElementById('complete').style.backgroundColor = "#ACADEB";
    }
});
document.getElementById('content_input').addEventListener('change', function(event){
    let title_input = document.getElementById('title_input');
    let content_input = document.getElementById('content_input');  
    let title_value = title_input.value;
    let content_value = content_input.value;

    if (title_value.length !=0 && content_value.length != 0){
        document.getElementById('complete').style.backgroundColor = "#7f6aee";
    }else{
        document.getElementById('complete').style.backgroundColor = "#ACADEB";
    }
});

